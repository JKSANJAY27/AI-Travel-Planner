import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, AlertCircle, ArrowLeft, Download, Share2, Edit3 } from 'lucide-react';

const ItineraryDayCard = ({ day, title, activities, notes }) => (
  <Card className="mb-6 shadow-lg bg-white border border-slate-200 rounded-lg">
    <CardHeader className="bg-slate-100 p-4 border-b border-slate-200">
      <CardTitle className="text-xl font-semibold text-purple-700">Day {day}: {title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 space-y-3">
      {activities && activities.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          {activities.map((activity, index) => (
            <li key={index} className="ml-2">{activity}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No specific activities listed for this day.</p>
      )}
      {notes && <p className="text-sm text-slate-600 italic mt-2"><strong>Notes:</strong> {notes}</p>}
    </CardContent>
  </Card>
);

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (currentFormData) => {
      if (!currentFormData) {
        if (isMounted) {
          setError("No trip data found. Please plan your trip first.");
          setIsLoading(false);
        }
        return;
      }

      if (isMounted) {
        setError(null);
      }


      console.log("Attempting to generate itinerary with formData:", currentFormData);

      try {
        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentFormData),
        });

        if (!isMounted) return;

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setItinerary(data);
        }
      } catch (err) {
        console.error("Failed to generate itinerary on frontend:", err);
        if (isMounted) {
          setError(err.message || "Could not generate your itinerary. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (formData && !hasFetched.current) {
      hasFetched.current = true;
      setIsLoading(true); 
      fetchData(formData);
    } else if (!formData && !hasFetched.current) { 
        setIsLoading(false);
        setError("No trip data found. Please plan your trip first.");
        hasFetched.current = true;
    }


    return () => {
      isMounted = false;
    };
  }, [formData, navigate]);

  if (!formData && !isLoading && error) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-3xl px-4 py-10 text-center">
          <Alert variant="destructive" className="mt-10">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/plan-trip')} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Plan a New Trip
          </Button>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Your AI-Crafted Itinerary
          </h1>
          {isLoading && (
            <p className="mt-3 text-lg text-slate-600 flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-purple-600" />
              Generating your dream journey with Gemini AI...
            </p>
          )}
        </header>

        {error && !isLoading && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && itinerary && (
          <Card className="shadow-xl overflow-hidden rounded-lg border border-slate-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-200 to-blue-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-semibold text-slate-800">{itinerary.title || "Your Personalized Trip"}</CardTitle>
                  {itinerary.destination && <CardDescription className="text-slate-700 mt-1 text-lg">To: {itinerary.destination}</CardDescription>}
                </div>
                <Wand2 className="h-10 w-10 text-purple-600 opacity-80" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {itinerary.overallSummary && (
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">Trip Overview</h3>
                  <p className="text-slate-700 whitespace-pre-line">{itinerary.overallSummary}</p>
                </div>
              )}

              {itinerary.days && itinerary.days.length > 0 ? (
                itinerary.days.map((dayData, index) => (
                  <ItineraryDayCard
                    key={index}
                    day={dayData.day}
                    title={dayData.title}
                    activities={dayData.activities}
                    notes={dayData.notes}
                  />
                ))
              ) : (
                <p className="text-slate-600 text-center py-4">Itinerary details are not available.</p>
              )}
            </CardContent>
            <CardFooter className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
               <Button onClick={() => navigate('/plan-trip')} variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100">
                <ArrowLeft className="mr-2 h-4 w-4" /> Plan Another Trip
              </Button>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-purple-500 text-purple-600 hover:bg-purple-50">
                  <Edit3 className="mr-2 h-4 w-4" /> Customize
                </Button>
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
         {!isLoading && !itinerary && !error && (
           <p className="text-center text-slate-500 mt-10">No itinerary to display. Please try planning a trip.</p>
         )}
      </main>
      <Footer />
    </div>
  );
};

export default ItineraryPage;