import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IGetUsersUser } from "@/types/user";
import { byte } from "@/utils";
import { Table } from "@tanstack/react-table";
import bytes from "bytes";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FaSearch } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";

type TableProp = {
  table: Table<IGetUsersUser>;
};

type TriggerProp = TableProp & {
  accessor: string;
};

const Trigger = ({ table, accessor }: TriggerProp) => {
  const filter_value = table.getColumn(accessor)?.getFilterValue() as any;
  const Icon = filter_value ? FaFilterCircleXmark : Filter;

  return (
    <Button variant="ghost" className="p-1">
      <Icon size={15} />
    </Button>
  );
};

const UpdatedAt = ({ table }: TableProp) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    table.getColumn("updated_at")?.setFilterValue(date);
  }, [date]);

  return (
    <div className="flex items-center gap-1">
      <div>Updated At</div>
      <DatePickerWithRange
        date={date}
        setDate={setDate}
        customTrigger={
          <div>
            <Trigger table={table} accessor="updated_at" />
          </div>
        }
      />
    </div>
  );
};

const CreatedAt = ({ table }: TableProp) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    table.getColumn("createdAt")?.setFilterValue(date);
  }, [date]);

  return (
    <div className="flex items-center gap-1">
      <div>Created At</div>
      <DatePickerWithRange
        date={date}
        setDate={setDate}
        customTrigger={
          <div>
            <Trigger table={table} accessor="createdAt" />
          </div>
        }
      />
    </div>
  );
};

const Id = ({ table }: TableProp) => {
  const [id, setId] = useState<number>();
  const [open, setOpen] = useState(false);

  function handleFilter() {
    table.getColumn("user_id")?.setFilterValue(id);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-1">
      <div>User</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Trigger table={table} accessor="user_id" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          {/* arrow a.k.a caret */}
          <div
            className="absolute w-0 h-0 border-transparent border-x-[7px] border-b-[7px] !border-b-slate-200 -top-[6.5px] left-[calc(50%-7px)]" // most of classes related to tailwind.config.ts > safelist
          ></div>
          <div className="flex items-center gap-2 bg-slate-200 p-2">
            <Input
              className="border border-transparent focus-visible:border-black"
              type="number"
              value={id}
              onChange={(e) => setId(+e.target.value || undefined)}
              style={{ boxShadow: "unset" }}
            />
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-slate-400"
              onClick={handleFilter}
            >
              <FaSearch />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const Name = ({ table }: TableProp) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  function handleFilter() {
    table.getColumn("user_name")?.setFilterValue(text);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-1">
      <div>Name</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Trigger table={table} accessor="user_name" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          {/* arrow a.k.a caret */}
          <div
            className="absolute w-0 h-0 border-transparent border-x-[7px] border-b-[7px] !border-b-slate-200 -top-[6.5px] left-[calc(50%-7px)]" // most of classes related to tailwind.config.ts > safelist
          ></div>
          <div className="flex items-center gap-2 bg-slate-200 p-2">
            <Input
              className="border border-transparent focus-visible:border-black"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ boxShadow: "unset" }}
            />
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-slate-400"
              onClick={handleFilter}
            >
              <FaSearch />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const Email = ({ table }: TableProp) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  function handleFilter() {
    table.getColumn("user_email")?.setFilterValue(text);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-1">
      <div>Email</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Trigger table={table} accessor="user_email" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          {/* arrow a.k.a caret */}
          <div
            className="absolute w-0 h-0 border-transparent border-x-[7px] border-b-[7px] !border-b-slate-200 -top-[6.5px] left-[calc(50%-7px)]" // most of classes related to tailwind.config.ts > safelist
          ></div>
          <div className="flex items-center gap-2 bg-slate-200 p-2">
            <Input
              className="border border-transparent focus-visible:border-black"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ boxShadow: "unset" }}
            />
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-slate-400"
              onClick={handleFilter}
            >
              <FaSearch />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const Available = ({ table }: TableProp) => {
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [open, setOpen] = useState(false);

  function handleFilter() {
    table.getColumn("available")?.setFilterValue({ min, max });
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-1">
      <div>Available</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Trigger table={table} accessor="available" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 max-w-[200px]">
          {/* arrow a.k.a caret */}
          <div
            className="absolute w-0 h-0 border-transparent border-x-[7px] border-b-[7px] !border-b-slate-200 -top-[6.5px] left-[calc(50%-7px)]" // most of classes related to tailwind.config.ts > safelist
          ></div>
          <div className="flex flex-col items-center gap-2 bg-slate-200 p-2 pb-1 ">
            <div className="flex items-center gap-2">
              Min
              <Input
                placeholder="15 kb"
                value={(min && byte(min)) || undefined}
                onChange={(e) => setMin(bytes(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              Max
              <Input
                placeholder="30 mb"
                value={(max && byte(max)) || undefined}
                onChange={(e) => setMax(bytes(e.target.value))}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-slate-400"
              onClick={handleFilter}
            >
              <FaSearch />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { CreatedAt, Name, Email, Available, UpdatedAt, Id };
