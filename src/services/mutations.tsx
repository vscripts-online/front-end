import {
  IAccount,
  ICreateAccountDTO,
  IDeleteAccountDTO,
  ILoginUrlGoogleDTO,
  ILoginUrlGoogleDTOResponse,
  IUpdateLabelDTO,
} from "@/types/account";
import {
  DefaultError,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  createAccount,
  deleteAccount,
  delete_file,
  login,
  loginUrlGoogle,
  register,
  setTotalDrive,
  sync_size,
  update_account_label,
  update_user_file,
  upload,
} from "./api";
import { ILoginDTO, ILoginResponse, ISetTotalDriveDTO } from "@/types/user";
import { IFile, IUpdateFileDTO, IUploadDTO } from "@/types/file";

export type CustomOptions<Data, DTO> = Omit<
  UseMutationOptions<AxiosResponse<Data>, DefaultError, DTO, unknown>,
  "mutationFn"
>;

export function useCreateAccount(
  options: CustomOptions<IAccount, ICreateAccountDTO> = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data: ICreateAccountDTO) => createAccount(data),
    onSuccess: async (data, variables, context) => {
      await queryClient.setQueryData(["accounts"], (accounts: IAccount[]) => [
        ...accounts,
        data.data,
      ]);
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });
}

export function useDeleteAccount(
  options: CustomOptions<IAccount, IDeleteAccountDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IDeleteAccountDTO) => deleteAccount(data),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["accounts"], (accounts: IAccount[]) =>
        accounts.filter((account) => account._id !== variables._id)
      );
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useLoginUrlGoogle(
  options: CustomOptions<ILoginUrlGoogleDTOResponse, ILoginUrlGoogleDTO> = {}
) {
  const mutation = useMutation({
    ...options,
    mutationFn: (data: ILoginUrlGoogleDTO) => loginUrlGoogle(data),
  });

  return mutation;
}

export function useSetTotalDrive(
  options: CustomOptions<boolean, ISetTotalDriveDTO> = {}
) {
  const mutation = useMutation({
    ...options,
    mutationFn: (data: ISetTotalDriveDTO) => setTotalDrive(data),
  });

  return mutation;
}

export function useRegister(
  options: CustomOptions<ILoginResponse, ILoginDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: ILoginDTO) => register(data),
    onSuccess(data, variables, context) {
      localStorage.setItem("token", data.data.session);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useLogin(
  options: CustomOptions<ILoginResponse, ILoginDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: ILoginDTO) => login(data),
    onSuccess(data, variables, context) {
      localStorage.setItem("token", data.data.session);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useUpload(options: CustomOptions<IFile, IUploadDTO> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUploadDTO) => upload(data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["user-files"] });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useUpdateUserfile(
  _id: string,
  options: CustomOptions<IFile, IUpdateFileDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUpdateFileDTO) => update_user_file(_id, data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["user-files", { file_id: _id }],
      });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useUpdateAccountLabel(
  options: CustomOptions<boolean, IUpdateLabelDTO> = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (data: IUpdateLabelDTO) => update_account_label(data),
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["accounts"], (values: IAccount[]) =>
        values.map((value) => {
          if (value._id === variables._id) {
            return { ...value, label: variables.label };
          }

          return value;
        })
      );
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useSyncSize(options: CustomOptions<boolean, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (id: string) => sync_size(id),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}

export function useDeleteFile(options: CustomOptions<boolean, string> = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...options,
    mutationFn: (id: string) => delete_file(id),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["user-files"],
      });
      options.onSuccess ? options.onSuccess(data, variables, context) : void 0;
    },
  });

  return mutation;
}
