import { mockStocks } from "@/data/mockStocks";
import Header from "@/components/Header";
import StockCard from "@/components/StockCard";
import Watchlist from "@/components/Watchlist";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketDashboard = () => {
  const trendingStocks = [...mockStocks].sort((a, b) => b.volume - a.volume).slice(0, 6);
  const topGainers = [...mockStocks]
    .filter((s) => s.change > 0)
    .sort((a, b) => b.changePercent - a.changePercent);
  const topLosers = [...mockStocks]
    .filter((s) => s.change < 0)
    .sort((a, b) => a.changePercent - b.changePercent);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Market Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time insights into trending stocks and market movers
          </p>
        </div>

        <Tabs defaultValue="trending" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary">
            <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Activity className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="gainers" className="data-[state=active]:bg-success data-[state=active]:text-success-foreground">
              <TrendingUp className="h-4 w-4 mr-2" />
              Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              <TrendingDown className="h-4 w-4 mr-2" />
              Losers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Trending Stocks
              </h2>
              <p className="text-muted-foreground mb-6">
                Most actively traded stocks by volume
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingStocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gainers" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-success mr-2" />
                Top Gainers
              </h2>
              <p className="text-muted-foreground mb-6">
                Stocks with the highest percentage gains today
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topGainers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="losers" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                <TrendingDown className="h-6 w-6 text-destructive mr-2" />
                Top Losers
              </h2>
              <p className="text-muted-foreground mb-6">
                Stocks with the highest percentage losses today
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topLosers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Watchlist />
    </div>
  );
};

export default MarketDashboard;
