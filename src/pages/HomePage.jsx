import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, BotMessageSquare, BrainCircuit, MapPin, MessageSquareText, Sparkles, Users, Zap } from "lucide-react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-foreground">
      <Navbar />

      <main className="flex-grow">

        <section
          className="relative pt-32 pb-20 md:pt-48 md:pb-28 flex items-center justify-center text-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?q=80&w=1770&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80 backdrop-blur-[2px]"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
                Craft Your Dream Journey, <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-rose-400">
                  Intelligently.
                </span>
              </h1>
              <p className="mt-6 max-w-xl sm:max-w-2xl mx-auto text-lg sm:text-xl text-white/90 drop-shadow-sm">
                Let our Gemini AI assistant design personalized itineraries, discover hidden gems, and make your next adventure unforgettable.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-all duration-300 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700">
                <Link to="/plan-trip">
                  Start Planning Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/70 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300 backdrop-blur-sm">
                  Explore Destinations
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 sm:h-20 text-slate-50 translate-y-1">
              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: "radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)", 
              backgroundSize: "50px 50px",
              color: "#6366f1"
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                How <span className="text-primary">VoyageAI</span> Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Planning your perfect trip is just a few simple steps away.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: MessageSquareText, title: "Tell Us Your Dreams", description: "Share your destination, interests, budget, and travel style. The more details, the better!" },
                { icon: BotMessageSquare, title: "AI Crafts Your Plan", description: "Our Gemini-powered AI analyzes your input to create a unique, personalized itinerary." },
                { icon: MapPin, title: "Explore & Customize", description: "Review your AI-generated plan, make tweaks, and get ready to explore the world." }
              ].map((step, index) => (
                <Card 
                  key={step.title} 
                  className="bg-white/80 backdrop-blur-sm text-card-foreground shadow-xl border border-slate-200/80 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2 rounded-xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500"></div>
                  <CardHeader className="items-center text-center p-8">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-indigo-400/10 rounded-full mb-4 ring-1 ring-primary/20 shadow-md flex justify-center items-center">
                      <step.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-foreground">{index + 1}. {step.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base pt-2 text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-gradient-to-br from-slate-100 to-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Why Choose <span className="text-primary">VoyageAI</span>?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience travel planning revolutionized by intelligent technology.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: BrainCircuit, title: "Gemini-Powered", description: "Leverage cutting-edge AI for hyper-personalized travel plans." },
                { icon: Zap, title: "Time-Saving", description: "Get a comprehensive itinerary in minutes, not hours." },
                { icon: Sparkles, title: "Discover Gems", description: "Uncover unique experiences and local favorites often missed." },
                { icon: Users, title: "User-Friendly", description: "Intuitive design makes planning your trip an absolute breeze." },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-white border border-slate-200/80 rounded-xl hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-indigo-400/10 rounded-lg mb-4 ring-1 ring-primary/10 shadow-sm">
                     <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-600 to-violet-600"></div>
          
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          
          <div className="absolute top-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 sm:h-20 text-slate-50 rotate-180 -translate-y-1">
              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
              Ready for Your Next Adventure?
            </h2>
            <p className="mt-4 text-lg max-w-xl mx-auto text-white/90">
              Don't let planning hold you back. Let VoyageAI handle the details so you can focus on the experience.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" className="text-white bg-white hover:bg-slate-100 shadow-lg transform hover:scale-105 transition-transform duration-200 px-8 py-6 rounded-full font-medium">
                Plan My Trip with AI <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;