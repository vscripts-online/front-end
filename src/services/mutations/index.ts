import { adminCreateAccount, adminDeleteAccount, adminDeleteFile, adminSyncAccount, adminUpdateFile, adminUpdateLabel, adminUpdateUserTotal, deleteFile, getAvailable, updateFile, upload } from "@/services/api";
import { IAccount, ICreateAccountDTO, ISyncAccountResponse, IUpdateLabelDTO } from "@/types/account";
import { IAdminUpdateFileDTO, IFile, IUpdateFileDTO, IUploadDTO } from "@/types/file";
import { IUpdateTotal } from "@/types/user";
import { increaseUserMetadataSizes } from "@/utils";
import { DefaultError, UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type CustomOptions<Data, DTO> = Omit<
  UseMutationOptions<AxiosResponse<Data>, DefaultError, DTO, unknown>,
  "mutationFn"
>;

export function useUpload(options: CustomOptions<IFile, IUploadDTO> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUploadDTO) => upload(data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.refetchQueries({ queryKey: ["user-files", 'files'] })
      increaseUserMetadataSizes(queryClient, 'used', +data.data.size)
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useUpdatefile(
  _id: string,
  options: CustomOptions<IFile, IUpdateFileDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUpdateFileDTO) => updateFile(_id, data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user-files", { file_id: _id }], });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminUpdateFile(
  _id: string,
  options: CustomOptions<IFile, IAdminUpdateFileDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IAdminUpdateFileDTO) => adminUpdateFile(_id, data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user-files", _id], });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useDeleteFile(options: CustomOptions<IFile, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (id: string) => deleteFile(id),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user-files"], });
      increaseUserMetadataSizes(queryClient, 'used', -data.data.size)
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminDeleteFile(options: CustomOptions<IFile, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (id: string) => adminDeleteFile(id),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user-files", 'authAPIQuery.GetMe'], });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminCreateAccount(options: CustomOptions<{ value: string }, ICreateAccountDTO> = {}) {
  const mutation = useMutation({
    ...options,
    mutationFn: (data: ICreateAccountDTO) => adminCreateAccount(data),
    onSuccess(data, variables, context) {
      window.open(data.data.value, '_blank')
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminUpdateTotal(options: CustomOptions<boolean, IUpdateTotal> = {}) {
  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUpdateTotal) => adminUpdateUserTotal(data),
    onSuccess(data, variables, context) {
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminSyncAccount(options: CustomOptions<ISyncAccountResponse, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (_id: string) => adminSyncAccount(_id),
    onSuccess(data, variables, context) {
      queryClient.setQueryData([variables], (oldData: IAccount) => ({ ...oldData, storage_size: data.data.storage_size, available_size: data.data.available_size, sync_time: new Date().toString() }));
      queryClient.invalidateQueries({ queryKey: ['total_storage'] })
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminDeleteAccount(options: CustomOptions<IAccount, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (_id: string) => adminDeleteAccount(_id),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAdminUpdateLabel(options: CustomOptions<{ value: boolean }, IUpdateLabelDTO> = {}) {
  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUpdateLabelDTO) => adminUpdateLabel(data._id, data.label),
    onSuccess(data, variables, context) {
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useAvailable(options: CustomOptions<boolean, number> = {}) {
  const mutation = useMutation({
    ...options,
    mutationFn: (size: number) => getAvailable(size),
    onSuccess(data, variables, context) {
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}
