import KeyValue from "@/components/key-value";
import { Input } from "@/components/ui/input";
import { useUserFile } from "@/services/queries";
import { IKeyValue } from "@/types/file";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { clearify_headers, formatByte } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useUpdateUserfile } from "@/services/mutations";
import { toast } from "sonner";

export default function UserFileDetail() {
  const { id } = useParams();
  const { data, isLoading } = useUserFile(id as string);

  const [headers, setHeaders] = useState<IKeyValue[]>(data?.headers || []);
  const [fileName, setFileName] = useState<string>(data?.file_name || "");

  const updateFileMutation = useUpdateUserfile(id || "", {
    onSuccess() {
      toast.success("Successfull");
    },
  });

  useEffect(() => {
    if (data) {
      setHeaders(data!.headers);
      setFileName(data!.file_name);
    }
  }, [data]);

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return "File not found";
  }

  const onDelete = (index: number) =>
    setHeaders(headers.filter((_, i) => i !== index));

  const onValueChange = (data: string, index: number) => {
    const new_headers = [...headers];
    new_headers[index].value = data;
    setHeaders(new_headers);
  };

  const onKeyChange = (data: string, index: number) => {
    const new_headers = [...headers];
    new_headers[index].key = data;
    setHeaders(new_headers);
  };

  const handleAdd = () => {
    console.log("handleAdd");
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleSave = () => {
    const post_headers = clearify_headers(headers);
    updateFileMutation.mutate({ file_name: fileName, headers: post_headers });
  };

  return (
    <>
      <div className="flex flex-col m-4 gap-3">
        <Button className="px-5 self-center" onClick={handleSave}>
          Save
        </Button>
        <Separator className="my-5" />
        <Button className="px-5 self-center">
          <Link
            to={import.meta.env.VITE_API_URL + "/files/" + data?.slug}
            target="_blank"
          >
            Open file at new tab
          </Link>
        </Button>
        <div className="flex items-center">
          <Label className="text-nowrap mr-3 w-32">Created At: </Label>
          <Input
            defaultValue={new Date(
              data?.created_at || Date.now()
            ).toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "full",
            })}
            disabled
          />
        </div>
        <div className="flex items-center">
          <Label className="text-nowrap mr-3 w-32">Mime Type: </Label>
          <Input defaultValue={data?.mime_type} disabled />
        </div>
        <div className="flex items-center">
          <Label className="text-nowrap mr-3 w-32">Size: </Label>
          <Input defaultValue={formatByte(data?.size)} disabled />
        </div>
        <div className="flex items-center">
          <Label className="text-nowrap mr-3 w-32">Slug: </Label>
          <Input defaultValue={data?.slug} disabled />
        </div>
        <div className="flex items-center h-10">
          <Label className="text-nowrap mr-3 w-32">Loading: </Label>
          <Checkbox
            asChild={data?.loading_from_cloud_now}
            checked={data?.loading_from_cloud_now}
            className="h-5 w-5 border border-black border-solid"
            disabled
          />
        </div>
        <div className="flex items-center">
          <Label className="text-nowrap mr-3 w-32">File Name: </Label>
          <Input
            defaultValue={data?.file_name}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
      </div>
      <Separator className="my-5" />
      <h1 className="text-center my-5">Headers</h1>
      {headers.map((_, index) => (
        <KeyValue
          key={index}
          default={headers[index]}
          onKeyChange={(data) => onKeyChange(data, index)}
          onValueChange={(data) => onValueChange(data, index)}
          onDelete={() => onDelete(index)}
        />
      ))}
      <Button className="mt-3 mx-auto block px-16" onClick={handleAdd}>
        <Plus />
      </Button>
    </>
  );
}
