import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  customTrigger?: React.ReactNode;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export function DatePickerWithRange({
  className,
  customTrigger,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);
  const [initialDate, setInitialDate] = React.useState(date);

  const trigger = customTrigger || (
    <Button
      id="date"
      variant={"outline"}
      className={cn(
        "w-auto justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {initialDate?.from ? (
        initialDate.to ? (
          <>
            {format(initialDate.from, "LLL dd, y")} -{" "}
            {format(initialDate.to, "LLL dd, y")}
          </>
        ) : (
          format(initialDate.from, "LLL dd, y")
        )
      ) : (
        <span>Pick a date</span>
      )}
    </Button>
  );

  React.useEffect(() => {
    setInitialDate(date);
  }, [open]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={initialDate?.from}
              selected={initialDate}
              onSelect={setInitialDate}
              numberOfMonths={2}
            />
            <div className="flex p-3 gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setInitialDate(undefined)}
              >
                Clear
              </Button>
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  setDate(initialDate);
                }}
              >
                Pick
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
