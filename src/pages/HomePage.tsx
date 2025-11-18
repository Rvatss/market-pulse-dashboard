import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, BarChart3, Shield, Zap, Globe } from "lucide-react";
import Header from "@/components/Header";
import Watchlist from "@/components/Watchlist";

const HomePage = () => {
  const features = [
    {
      icon: Search,
      title: "Real-Time Search",
      description: "Search and track any stock symbol with live market data and detailed analytics.",
    },
    {
      icon: BarChart3,
      title: "Market Dashboard",
      description: "View trending stocks, top gainers, and losers in an intuitive dashboard.",
    },
    {
      icon: TrendingUp,
      title: "Price Charts",
      description: "Interactive line charts showing 30-day price history for informed decisions.",
    },
    {
      icon: Zap,
      title: "Quick Watchlist",
      description: "Save your favorite stocks to a persistent watchlist for easy monitoring.",
    },
    {
      icon: Shield,
      title: "Secure & Fast",
      description: "Lightning-fast performance with secure data handling and modern encryption.",
    },
    {
      icon: Globe,
      title: "Always Available",
      description: "Access your portfolio and market data 24/7 from any device, anywhere.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-success/5" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Trade Smarter,
              <br />
              <span className="text-primary">Invest Better</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your gateway to real-time market insights, powerful analytics, and seamless stock tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                  View Dashboard
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-primary/30 hover:bg-primary/10">
                  Search Stocks
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track, analyze, and manage your stock portfolio efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of investors making smarter decisions with real-time market data.
            </p>
            <Link to="/search">
              <Button size="lg" className="text-lg px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                Start Trading Now
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-primary p-2">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">StockXchange</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 StockXchange. Real-time market insights at your fingertips.
            </p>
          </div>
        </div>
      </footer>

      <Watchlist />
    </div>
  );
};

export default HomePage;
