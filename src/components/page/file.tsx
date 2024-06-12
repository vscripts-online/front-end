import KeyValue from "@/components/key-value";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CustomOptions } from "@/services/mutations";
import { IFile } from "@/types/file";
import { byte, clearify_headers } from "@/utils";
import { TimeAgo } from "@/utils/timeago";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosResponse } from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  _id: string;
  useUpdate: (
    _id: string,
    options?: CustomOptions<IFile, any>
  ) => UseMutationResult<AxiosResponse<IFile, any>, Error, any, unknown>;
  useFile: (file_id: string) => UseQueryResult<IFile, Error>;
};

function FilePage({ _id, useUpdate, useFile }: Props) {
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [file_name, setFileName] = useState("");

  const { data, isPending, refetch } = useFile(_id);

  const { mutate, isPending: mutatePending } = useUpdate(_id, {
    onSuccess() {
      toast.success("Successfully updated");
      refetch();
    },
  });

  useEffect(() => {
    if (data) {
      data.headers && setHeaders(data.headers);
      data.file_name && setFileName(data.file_name);
    }
  }, [data]);

  function handleSave() {
    const post_headers = clearify_headers(headers);
    mutate({ file_name, headers: post_headers, user: data?.user || 0 });
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

  if (isPending || !data) return "Loading";

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-1">
        <Link
          className="text-center mb-2"
          to={`${import.meta.env.VITE_API_URL}/files/${data._id}`}
          target="_blank"
        >
          <Button className="h-auto">View File</Button>
        </Link>
        <span>
          Created At: <TimeAgo date={data.created_at} />
        </span>
        <span>
          Updated At: <TimeAgo date={data.updated_at} />
        </span>
        <span>Original Name: {data.original_name}</span>
        <span>Mime Type: {data.mime_type}</span>
        <span>Size: {byte(+data.size)}</span>
        {data.user && <span>User: {data.user}</span>}
        <div className="flex items-center gap-3">
          Name:{" "}
          <Input
            className="h-auto py-2"
            value={file_name}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <LoadingButton
          className="w-fit mt-3 mx-auto"
          variant="success"
          loading={mutatePending}
          onClick={handleSave}
        >
          Save
        </LoadingButton>
        {data.parts && (
          <div className="flex flex-col gap-3 mt-3">
            <Separator />
            {(data.parts || []).map((part, index) => (
              <div className="flex pb-1 gap-3 justify-between">
                <div>
                  {index + 1}.{" "}
                  <span>
                    {byte(+part.offset)} - {byte(+part.offset + +part.size)}{" "}
                  </span>
                </div>
                <Link to="/admin/accounts/$_id" params={{ _id: part.owner }}>
                  <Button className="px-3 py-1 h-auto justify-self-end">
                    Go To Account
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-2 border-l-2 pl-5">
        {headers.map((_, index) => (
          <KeyValue
            key={index}
            default={headers[index]}
            onKeyChange={(data) => onKeyChange(data, index)}
            onValueChange={(data) => onValueChange(data, index)}
            onDelete={() => setHeaders(headers.filter((_, i) => i !== index))}
          />
        ))}
        <Button
          className="mt-3 mx-auto block px-16"
          onClick={() => setHeaders([...headers, { key: "", value: "" }])}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export default FilePage;
