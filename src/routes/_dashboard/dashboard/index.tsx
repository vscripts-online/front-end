import KeyValue from "@/components/key-value";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAvailable, useUpload } from "@/services/mutations";
import { clearify_headers, getErrorMessage } from "@/utils";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: Page,
});

function Page() {
  const [headers, setHeaders] = useState<any[]>([]);
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<string | null>(); // null means upload finished
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      inputFileRef.current!.value = "";
      return;
    }

    const available = await availableMutation.mutateAsync(file.size);
    if (!available.data) {
      toast.error("No space in storage. Wait admin to add storage.");
      inputFileRef.current!.value = "";
      return;
    }

    setFile(file);
    setFileName(file?.name || "");
  }

  const availableMutation = useAvailable();

  const uploadMutation = useUpload({
    onSuccess(data) {
      toast.success("Successfully uploaded");
      setHeaders([]);
      setFile(undefined);
      setFileName("");
      setProgress(null);
      setUploadedFiles([...uploadedFiles, data.data._id].slice(-3));
      inputFileRef.current!.value = "";
    },
    onError(error: any) {
      try {
        const message = getErrorMessage(error);
        toast.error(message);
      } catch (error) {
        toast.error("Failed");
      }
    },
  });

  function handleUpload() {
    setProgress(undefined);
    const post_headers = clearify_headers(headers);

    if (!file) {
      toast.warning("Plase select a file");
      return;
    }

    uploadMutation.mutate({
      file,
      headers: post_headers,
      file_name: fileName || "",
      progress(progress) {
        setProgress((oldProgress) => {
          return oldProgress === null
            ? null
            : (progress.progress + "").slice(2, 4);
        });
      },
    });
  }

  function handleAdd() {
    setHeaders([...headers, { key: "", value: "" }]);
  }

  function onDelete(index: number) {
    setHeaders(headers.filter((_, i) => i !== index));
  }

  function onValueChange(data: string, index: number) {
    const new_headers = [...headers];
    new_headers[index].value = data;
    setHeaders(new_headers);
  }

  function onKeyChange(data: string, index: number) {
    const new_headers = [...headers];
    new_headers[index].key = data;
    setHeaders(new_headers);
  }

  return (
    <div>
      {uploadedFiles.map((uploadedFile, index) => (
        <div
          className="flex border justify-between items-center rounded mb-5 p-5"
          key={index}
        >
          <div className="flex items-center gap-3">
            <CiCircleCheck size={40} className="text-green-700" />
            File Uploaded{" "}
            <Link
              className="font-semibold underline underline-offset-2"
              to="/dashboard/files/$_id"
              params={{ _id: uploadedFile }}
            >
              Go to file details
            </Link>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setUploadedFiles(uploadedFiles.filter((x) => x !== uploadedFile))
            }
          >
            X
          </Button>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-5">
          <Label htmlFor="file">File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFile}
            ref={inputFileRef}
          />
          <Label htmlFor="file_name">File Name</Label>
          <Input
            id="file_name"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          {progress && <div className="self-center">{"%" + progress}</div>}
          <Button
            onClick={handleUpload}
            disabled={uploadMutation.isPending || !file}
          >
            Upload
            {uploadMutation.isPending && (
              <IoReload className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
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
