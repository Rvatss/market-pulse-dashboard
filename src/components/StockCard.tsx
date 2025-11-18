import { Stock } from "@/data/mockStocks";
import { TrendingUp, TrendingDown, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
}

const StockCard = ({ stock, onClick }: StockCardProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const isPositive = stock.change >= 0;

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setIsInWatchlist(watchlist.some((s: Stock) => s.symbol === stock.symbol));
  }, [stock.symbol]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    
    if (isInWatchlist) {
      const filtered = watchlist.filter((s: Stock) => s.symbol !== stock.symbol);
      localStorage.setItem("watchlist", JSON.stringify(filtered));
      setIsInWatchlist(false);
    } else {
      watchlist.push(stock);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleWatchlist}
            className={cn(
              "h-8 w-8 rounded-full transition-all",
              isInWatchlist
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-secondary"
            )}
          >
            {isInWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">
                ${stock.price.toFixed(2)}
              </p>
              {stock.marketCap && (
                <p className="text-xs text-muted-foreground mt-1">
                  Market Cap: ${stock.marketCap}
                </p>
              )}
            </div>
            <div className={cn(
              "flex items-center space-x-1 rounded-lg px-3 py-1",
              isPositive ? "bg-success/10" : "bg-destructive/10"
            )}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={cn(
                "text-sm font-semibold",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Change:</span>
            <span className={cn(
              "font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? "+" : ""}${stock.change.toFixed(2)}
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Vol:</span>
                <span className="ml-2 font-medium text-foreground">
                  {(stock.volume / 1000000).toFixed(2)}M
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">High:</span>
                <span className="ml-2 font-medium text-foreground">
                  ${stock.high.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </CardContent>
    </Card>
  );
};

export default StockCard;
