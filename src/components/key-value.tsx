import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toKebabCase } from "@/lib/utils";
import { IKeyValue } from "@/types/file";
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
    <div className="flex gap-2 mb-3">
      <Input
        placeholder="key"
        value={props.default.key}
        onChange={onKeyChange}
        onBlur={onBlur}
      />
      <Input
        placeholder="value"
        value={props.default.value}
        onChange={onValueChange}
      />
      <Button className="p-2" onClick={props.onDelete}>
        <Trash2 size={20} />
      </Button>
    </div>
  );
}
