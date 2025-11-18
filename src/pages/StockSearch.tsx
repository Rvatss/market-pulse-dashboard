import { useState } from "react";
import { mockStocks, generateStockHistory } from "@/data/mockStocks";
import Header from "@/components/Header";
import StockCard from "@/components/StockCard";
import StockChart from "@/components/StockChart";
import Watchlist from "@/components/Watchlist";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StockSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<typeof mockStocks[0] | null>(null);

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stockHistory = selectedStock ? generateStockHistory(selectedStock.price) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Search Stocks
          </h1>
          <p className="text-xl text-muted-foreground">
            Find detailed information about any stock symbol
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by symbol or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-lg bg-card border-border focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {selectedStock ? (
          <div className="space-y-6 animate-fade-in">
            <Button
              variant="outline"
              onClick={() => setSelectedStock(null)}
              className="border-border"
            >
              ← Back to Results
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl">{selectedStock.symbol}</CardTitle>
                        <p className="text-muted-foreground mt-1">{selectedStock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-foreground">
                          ${selectedStock.price.toFixed(2)}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            selectedStock.change >= 0 ? "text-success" : "text-destructive"
                          }`}
                        >
                          {selectedStock.change >= 0 ? "+" : ""}
                          {selectedStock.change.toFixed(2)} (
                          {selectedStock.changePercent.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <StockChart
                      data={stockHistory}
                      isPositive={selectedStock.change >= 0}
                    />
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Market Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Open</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${selectedStock.open.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">High</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${selectedStock.high.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Low</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${selectedStock.low.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Prev. Close</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${selectedStock.previousClose.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Volume</p>
                        <p className="text-lg font-semibold text-foreground">
                          {(selectedStock.volume / 1000000).toFixed(2)}M
                        </p>
                      </div>
                      {selectedStock.marketCap && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                          <p className="text-lg font-semibold text-foreground">
                            ${selectedStock.marketCap}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-border bg-card sticky top-24">
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Symbol</span>
                        <span className="font-medium text-foreground">
                          {selectedStock.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Price</span>
                        <span className="font-medium text-foreground">
                          ${selectedStock.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change</span>
                        <span
                          className={`font-medium ${
                            selectedStock.change >= 0 ? "text-success" : "text-destructive"
                          }`}
                        >
                          {selectedStock.change >= 0 ? "+" : ""}
                          ${selectedStock.change.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change %</span>
                        <span
                          className={`font-medium ${
                            selectedStock.changePercent >= 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {selectedStock.changePercent >= 0 ? "+" : ""}
                          {selectedStock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  stock={stock}
                  onClick={() => setSelectedStock(stock)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No stocks found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Watchlist />
    </div>
  );
};

export default StockSearch;
