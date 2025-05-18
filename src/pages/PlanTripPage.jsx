import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, PlaneTakeoff, Users, DollarSign, Palette, Clock, BedDouble, StickyNote, MapPin, GripVertical, Check } from "lucide-react"; // Added Check icon

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PlanTripPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState({ from: undefined, to: undefined });
  const [numTravelers, setNumTravelers] = useState("1");
  const [travelerType, setTravelerType] = useState("solo");
  const [budget, setBudget] = useState("mid-range");
  const [interests, setInterests] = useState({
    adventure: false,
    relaxation: false,
    culture: false,
    foodie: false,
    history: false,
    nature: false,
    nightlife: false,
    shopping: false,
  });
  const [travelPace, setTravelPace] = useState("moderate");
  const [accommodation, setAccommodation] = useState("hotel-3-4");
  const [mustHaves, setMustHaves] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleInterestChange = (interest) => {
    setInterests((prev) => ({ ...prev, [interest]: !prev[interest] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = {
      destination,
      dates: {
        from: dates.from ? format(dates.from, "yyyy-MM-dd") : undefined,
        to: dates.to ? format(dates.to, "yyyy-MM-dd") : undefined,
      },
      numTravelers,
      travelerType,
      budget,
      selectedInterests: Object.entries(interests)
        .filter(([_, checked]) => checked)
        .map(([interest]) => interest),
      travelPace,
      accommodation,
      mustHaves,
      additionalNotes,
    };
    console.log("Trip Plan Data:", formDataToSubmit);

    navigate('/itinerary', { state: { formData: formDataToSubmit } });
  };

  const interestOptions = [
    { id: "adventure", label: "🏔️ Adventure" },
    { id: "relaxation", label: "🧘 Relaxation" },
    { id: "culture", label: "🏛️ Culture" },
    { id: "foodie", label: "🍜 Foodie" },
    { id: "history", label: "📜 History" },
    { id: "nature", label: "🌳 Nature" },
    { id: "nightlife", label: "🌃 Nightlife" },
    { id: "shopping", label: "🛍️ Shopping" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-10 sm:py-16">
        <header className="mb-10 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Let's Plan Your <span className="text-purple-600">Perfect Getaway</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Fill in the details below, and our AI will craft a personalized itinerary just for you.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          <Card className="shadow-lg overflow-hidden rounded-lg border border-slate-200 bg-white">
            <CardHeader className="bg-slate-100 p-5 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-slate-800">Where & When?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="destination" className="text-base font-medium text-slate-700">Destination(s)</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France or Tokyo, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="text-base p-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-slate-500">You can enter multiple destinations separated by commas.</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="dates" className="text-base font-medium text-slate-700">Travel Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dates"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal p-2.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                        !dates.from && "text-slate-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-purple-600" />
                      {dates.from ? (
                        dates.to ? (
                          <>
                            {format(dates.from, "LLL dd, y")} - {format(dates.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dates.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick your dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dates}
                      onSelect={setDates}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg overflow-hidden rounded-lg border border-slate-200 bg-white">
            <CardHeader className="bg-slate-100 p-5 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-slate-800">Who's Traveling?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="numTravelers" className="text-base font-medium text-slate-700">Number of Travelers</Label>
                  <Input
                    id="numTravelers" type="number" min="1" value={numTravelers}
                    onChange={(e) => setNumTravelers(e.target.value)} required
                    className="text-base p-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="travelerType" className="text-base font-medium text-slate-700">Travel Style</Label>
                  <Select value={travelerType} onValueChange={setTravelerType}>
                    <SelectTrigger className="w-full p-2.5 text-base rounded-md border border-slate-300 bg-white hover:bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800">
                      <SelectValue placeholder="Select travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo Adventurer</SelectItem>
                      <SelectItem value="couple">Couple's Escape</SelectItem>
                      <SelectItem value="family">Family Fun</SelectItem>
                      <SelectItem value="friends">Group of Friends</SelectItem>
                      <SelectItem value="business">Business Trip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg overflow-hidden rounded-lg border border-slate-200 bg-white">
            <CardHeader className="bg-slate-100 p-5 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <GripVertical className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-slate-800">Your Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="grid gap-3">
                <Label className="text-base font-medium text-slate-700 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-slate-500" /> Budget Level
                </Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="w-full p-2.5 text-base rounded-md border border-slate-300 bg-white hover:bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800">
                    <SelectValue placeholder="Select budget level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">💰 Economy (Budget-friendly)</SelectItem>
                    <SelectItem value="mid-range">💸 Mid-Range (Comfortable)</SelectItem>
                    <SelectItem value="luxury">💎 Luxury (Premium Experience)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                <Label className="text-base font-medium text-slate-700 flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-slate-500" /> Interests & Themes
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {interestOptions.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={interests[interest.id]}
                        onCheckedChange={() => handleInterestChange(interest.id)}
                        className="h-5 w-5 rounded border-slate-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                      >
                      </Checkbox>
                      <Label htmlFor={interest.id} className="text-sm font-normal text-slate-700 cursor-pointer select-none">
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <Label className="text-base font-medium text-slate-700 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-slate-500" /> Travel Pace
                </Label>
                <RadioGroup value={travelPace} onValueChange={setTravelPace} className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                  {["relaxed", "moderate", "fast-paced"].map(pace => (
                    <div key={pace} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={pace} 
                        id={pace} 
                        className="h-5 w-5 border-slate-400 data-[state=checked]:border-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                      />
                      <Label htmlFor={pace} className="font-normal text-slate-700 cursor-pointer select-none">
                        {pace === 'relaxed' && '🐢 '}
                        {pace === 'moderate' && '🚶 '}
                        {pace === 'fast-paced' && '🏃 '}
                        {pace.charAt(0).toUpperCase() + pace.slice(1).replace('-', ' ')}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="grid gap-3">
                <Label className="text-base font-medium text-slate-700 flex items-center">
                    <BedDouble className="h-5 w-5 mr-2 text-slate-500" /> Accommodation Type (Preferred)
                </Label>
                 <Select value={accommodation} onValueChange={setAccommodation}>
                    <SelectTrigger className="w-full p-2.5 text-base rounded-md border border-slate-300 bg-white hover:bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-800">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any (AI Decides)</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="hotel-budget">Budget Hotel (1-2 ★)</SelectItem>
                      <SelectItem value="hotel-3-4">Standard Hotel (3-4 ★)</SelectItem>
                      <SelectItem value="hotel-luxury">Luxury Hotel (5 ★)</SelectItem>
                      <SelectItem value="airbnb">Airbnb / Apartment</SelectItem>
                      <SelectItem value="boutique">Boutique Hotel</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg overflow-hidden rounded-lg border border-slate-200 bg-white">
            <CardHeader className="bg-slate-100 p-5 border-b border-slate-200">
               <div className="flex items-center space-x-3">
                <StickyNote className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-xl font-semibold text-slate-800">Additional Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="mustHaves" className="text-base font-medium text-slate-700">Must-have Activities or Places</Label>
                <Textarea
                  id="mustHaves"
                  placeholder="e.g., Visit the Eiffel Tower, Try authentic ramen..."
                  value={mustHaves}
                  onChange={(e) => setMustHaves(e.target.value)}
                  className="text-base min-h-[100px] p-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="additionalNotes" className="text-base font-medium text-slate-700">Other Preferences or Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="e.g., Prefer vegetarian food, Need wheelchair accessibility..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="text-base min-h-[100px] p-2.5 rounded-md border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          <Separator className="bg-slate-300"/>

          <div className="flex justify-center pt-2 pb-8">
            <Button type="submit" size="lg" className="w-full max-w-xs text-base font-semibold text-black bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all px-6 py-3 rounded-lg">
              <PlaneTakeoff className="mr-2 h-5 w-5" />
              Generate My Itinerary
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PlanTripPage;