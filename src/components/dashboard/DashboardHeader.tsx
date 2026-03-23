import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

const periods = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
] as const;

interface DashboardHeaderProps {
  onPeriodChange?: (days: number) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function DashboardHeader({ onPeriodChange, onDateRangeChange }: DashboardHeaderProps) {
  const [activePeriod, setActivePeriod] = useState<number>(30);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const handlePeriodClick = (days: number) => {
    setActivePeriod(days);
    const to = new Date();
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    setDateRange({ from, to });
    onPeriodChange?.(days);
    onDateRangeChange?.({ from, to });
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setActivePeriod(0);
    onDateRangeChange?.(range);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-google text-xl font-semibold text-foreground">Ecommerce Analytics</h1>
        <p className="text-sm text-text-secondary mt-0.5">Monitor your store performance</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Period selector pills */}
        <div className="flex items-center bg-surface rounded-lg p-0.5 gap-0.5">
          {periods.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePeriodClick(p.days)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                activePeriod === p.days
                  ? "bg-card text-foreground shadow-level-1"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Date range picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 px-3 text-xs font-normal border-border bg-card",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-text-muted" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} – {format(dateRange.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                "Pick dates"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
