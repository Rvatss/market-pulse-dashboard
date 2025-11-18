import { useState, useEffect } from "react";
import { Stock } from "@/data/mockStocks";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadWatchlist = () => {
      const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setWatchlist(saved);
    };

    loadWatchlist();
    window.addEventListener("storage", loadWatchlist);
    
    // Poll for changes since storage event doesn't fire in same tab
    const interval = setInterval(loadWatchlist, 1000);

    return () => {
      window.removeEventListener("storage", loadWatchlist);
      clearInterval(interval);
    };
  }, []);

  const removeFromWatchlist = (symbol: string) => {
    const filtered = watchlist.filter((s) => s.symbol !== symbol);
    localStorage.setItem("watchlist", JSON.stringify(filtered));
    setWatchlist(filtered);
  };

  if (!isVisible || watchlist.length === 0) {
    return null;
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 max-h-96 overflow-y-auto border-border bg-card/95 backdrop-blur-lg shadow-2xl z-40 animate-slide-up">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span>Watchlist</span>
        </h3>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-2 space-y-2">
        {watchlist.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground">{stock.symbol}</span>
                  <span className="text-sm font-bold text-foreground">
                    ${stock.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {stock.name}
                  </span>
                  <div className={cn(
                    "flex items-center space-x-1 text-xs font-medium",
                    isPositive ? "text-success" : "text-destructive"
                  )}>
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeFromWatchlist(stock.symbol)}
                className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Watchlist;
