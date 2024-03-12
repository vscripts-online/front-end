import KeyValue from "@/components/key-value";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearify_headers, getErrorMessage } from "@/lib/utils";
import { useUpload } from "@/services/mutations";
import { IKeyValue } from "@/types/file";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function UserDashbard() {
  const [headers, setHeaders] = useState<IKeyValue[]>([]);
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();
  const [progress, setProgress] = useState<string>();

  const uploadMutation = useUpload({
    onSuccess() {
      toast.success("Successfully uploaded");
    },
    onError(error: any) {
      try {
        console.log("onerrorrr", error);
        const message = getErrorMessage(error);
        toast.error(message);
      } catch (error) {
        toast.error("Failed");
      }
    },
  });

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFile(file);
    setFileName(file?.name);
  }

  const handleAdd = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleUpload = () => {
    const post_headers = clearify_headers(headers);
    console.log(headers);

    if (!file) {
      toast.warning("Plase select a file");
      return;
    }

    uploadMutation.mutate({
      file,
      headers: post_headers,
      file_name: fileName || "",
      progress(progress) {
        setProgress((progress.progress + "").slice(2, 4));
      },
    });
  };

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

  return (
    <div className="flex flex-col gap-3">
      Upload file
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" onChange={handleFile} />
          <Label htmlFor="File Name">File Name</Label>
          <Input
            id="file_name"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <div className="self-center">{progress && "%" + progress}</div>
          <Button onClick={handleUpload} disabled={uploadMutation.isPending}>
            Upload
            {uploadMutation.isPending && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <div className="self-center">
            {uploadMutation.isSuccess && (
              <Link
                to={
                  "http://localhost:3000/files/" + uploadMutation.data.data.slug
                }
                target="_blank"
              >
                File successfully uploaded. &nbsp; Click to view.
              </Link>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-2">Headers</div>
          {headers.map((_, index) => (
            <KeyValue
              key={index}
              default={headers[index]}
              onKeyChange={(data) => onKeyChange(data, index)}
              onValueChange={(data) => onValueChange(data, index)}
              onDelete={() => onDelete(index)}
            />
          ))}
          <Button
            className="mt-3 mx-auto block px-16"
            onClick={handleAdd}
            disabled={uploadMutation.isPending}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
