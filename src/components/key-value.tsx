import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IKeyValue } from "@/types/file";
import { toKebabCase } from "@/utils";
import { Trash2 } from "lucide-react";

interface Props {
  default: IKeyValue;
  onKeyChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onDelete: () => void;
}

export default function KeyValue(props: Props) {
  const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onKeyChange(value);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = toKebabCase(e.target.value);
    props.onKeyChange(value);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.onValueChange(value);
  };

  return (
    <div className="flex gap-3 my-2">
      <Input
        className="h-[2rem]"
        placeholder="key"
        value={props.default.key}
        onChange={onKeyChange}
        onBlur={onBlur}
      />
      <Input
        className="h-[2rem]"
        placeholder="value"
        value={props.default.value}
        onChange={onValueChange}
      />
      <Button className="px-2 h-auto" onClick={props.onDelete}>
        <Trash2 size={15} />
      </Button>
    </div>
  );
}
