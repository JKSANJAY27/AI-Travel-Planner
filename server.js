import express from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set in the environment variables.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

app.post('/api/generate-itinerary', async (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).json({ message: "No form data provided." });
  }

  let prompt = `You are an expert travel planner AI. Create a personalized travel itinerary based on the following user preferences.
  Provide the output strictly as a JSON object with the following structure:
  {
    "title": "A descriptive title for the trip (e.g., 'Your Awesome 5-Day Adventure in Paris')",
    "destination": "The primary destination mentioned",
    "overallSummary": "A brief 2-3 sentence summary of the trip.",
    "days": [
      {
        "day": 1,
        "title": "A catchy title for the day (e.g., 'Arrival and Eiffel Tower Magic')",
        "activities": ["Detailed activity 1", "Detailed activity 2", "Suggestion for meal"],
        "notes": "Optional short notes or tips for the day"
      }
    ],
    "travelTips": ["General tip 1", "General tip 2"],
    "packingSuggestions": ["Item 1", "Item 2"]
  }

  User Preferences:
  Destination(s): ${formData.destination}
  Travel Dates: From ${formData.dates?.from || 'Not specified'} to ${formData.dates?.to || 'Not specified'}
  Number of Travelers: ${formData.numTravelers}
  Traveler Type: ${formData.travelerType}
  Budget Level: ${formData.budget}
  Interests: ${formData.selectedInterests?.join(', ') || 'Not specified'}
  Travel Pace: ${formData.travelPace}
  Preferred Accommodation: ${formData.accommodation}
  Must-have Activities/Places: ${formData.mustHaves || 'None specified'}
  Additional Notes/Preferences: ${formData.additionalNotes || 'None specified'}

  Generate a suitable itinerary. If dates are provided, try to make the number of days in the itinerary match the duration. If not, suggest a reasonable duration based on the destination and interests (e.g., 3-7 days).
  Be creative and suggest interesting and relevant activities.
  Ensure the output is a valid JSON object ONLY. Do not include any text before or after the JSON object.
  `;

  console.log("--- Sending Prompt to Gemini ---");

  try {
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    
    console.log("--- Gemini Raw Response Text ---");
    console.log(responseText);

    let cleanedResponseText = responseText.trim();
    if (cleanedResponseText.startsWith("```json")) {
        cleanedResponseText = cleanedResponseText.substring(7);
    }
    if (cleanedResponseText.endsWith("```")) {
        cleanedResponseText = cleanedResponseText.substring(0, cleanedResponseText.length - 3);
    }
    
    const itineraryData = JSON.parse(cleanedResponseText);
    res.json(itineraryData);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error.response && error.response.promptFeedback) {
        console.error('Prompt Feedback:', error.response.promptFeedback);
        return res.status(400).json({ message: 'Content generation blocked due to safety settings. Please revise your input.', details: error.response.promptFeedback });
    }
    res.status(500).json({ message: 'Failed to generate itinerary from AI.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});