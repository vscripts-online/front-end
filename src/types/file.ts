import { AxiosProgressEvent } from "axios";

export interface IFile {
  _id: string;
  name?: string;
  original_name: string;
  mime_type: string;
  size: string;
  slug: string;
  loading_from_cloud_now?: boolean;
  headers: IFileHeader[];
  parts?: IFilePart[];
  user?: number;
  file_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IFileHeader {
  key: string;
  value: string;
}

export interface IFilePart {
  owner: string;
  name: string;
  offset: string;
  size: string;
  id: string;
}

export interface IKeyValue {
  key: string;
  value: string;
}

export interface IUploadDTO {
  file_name: string;
  file: File;
  headers: IKeyValue[];
  progress?: (progress: AxiosProgressEvent) => void;
}

export interface IUpdateFileDTO {
  file_name: string;
  headers: IFileHeader[];
}
