import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccounts,
  getFiles,
  getMe,
  getTotalStorage,
  getTotalUsers,
  getUserFile,
  getUserFiles,
  getUsers,
} from "./api";
import { IFile } from "@/types/file";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAccounts(),
  });
};

export const useFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(),
  });
};

export const useTotalUsers = () => {
  return useQuery({
    queryKey: ["total-users"],
    queryFn: () => getTotalUsers(),
  });
};

export const useTotalStorage = () => {
  return useQuery({
    queryKey: ["total-storage"],
    queryFn: () => getTotalStorage(),
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    retry() {
      return false;
    },
  });
};

export const useUserFiles = () => {
  return useQuery({
    queryKey: ["user-files"],
    queryFn: () => getUserFiles(),
  });
};

export const useUserFile = (file_id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user-files", { file_id }],
    queryFn: () => getUserFile(file_id),
    initialData: () => {
      const cache = queryClient.getQueryData<IFile[]>(["user-files"]);

      const item = cache?.find((c) => c._id === file_id);
      return item;
    },
    retry() {
      return false;
    },
  });
};
