import {
  IAccount,
  ICreateAccountDTO,
  IDeleteAccountDTO,
  ILoginUrlGoogleDTO,
  ILoginUrlGoogleDTOResponse,
  ITotalStorageResponse,
  IUpdateLabelDTO,
} from "@/types/account";
import { IFile, IUpdateFileDTO, IUploadDTO } from "@/types/file";
import {
  ILoginDTO,
  ILoginResponse,
  ISetTotalDriveDTO,
  IUser,
} from "@/types/user";
import axios, { AxiosError } from "axios";

const { VITE_API_URL } = import.meta.env;

const BASE_URL = VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || ["Error"];
      throw message[0];
    }
  }
);

export const getUsers = async () => {
  return (await axiosInstance.get<IUser[]>("/user/users?sort_by=id")).data;
};

export const getAccounts = async () => {
  return (await axiosInstance.get<IAccount[]>("/account/accounts")).data;
};

export const getFiles = async () => {
  return (await axiosInstance.get<IFile[]>("/files")).data;
};

export const createAccount = async (data: ICreateAccountDTO) => {
  return await axiosInstance.post<IAccount>("/account/new_account", data);
};

export const deleteAccount = async (data: IDeleteAccountDTO) => {
  return await axiosInstance.delete<IAccount>("/account/" + data._id);
};

export const loginUrlGoogle = async (data: ILoginUrlGoogleDTO) => {
  return await axiosInstance.post<ILoginUrlGoogleDTOResponse>(
    "/account/login_url_google",
    data
  );
};

export const setTotalDrive = async (data: ISetTotalDriveDTO) => {
  return await axiosInstance.post<boolean>("/user/update_total", data);
};

export const getTotalUsers = async () => {
  return (await axiosInstance.get<number>("/user/count")).data;
};

export const getMe = async () => {
  return (await axiosInstance.get<IUser>("/user/me")).data;
};

export const getTotalStorage = async () => {
  return (
    await axiosInstance.get<ITotalStorageResponse>("/account/total_storage")
  ).data;
};

export const login = async (data: ILoginDTO) => {
  return await axiosInstance.post<ILoginResponse>("/user/login", data);
};

export const register = async (data: ILoginDTO) => {
  return await axiosInstance.post<ILoginResponse>("/user/register", data);
};

export const upload = async (data: IUploadDTO) => {
  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("file_name", data.file_name);
  formData.append("headers", JSON.stringify(data.headers));

  return await axiosInstance.post<IFile>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getUserFiles = async () => {
  return (await axiosInstance.get<IFile[]>("/user/files?sort_by=-_id")).data;
};

export const getUserFile = async (_id: string) => {
  return (await axiosInstance.get<IFile>("/user/files/" + _id)).data;
};

export const update_user_file = async (_id: string, data: IUpdateFileDTO) => {
  return await axiosInstance.put<IFile>("/user/files/" + _id, data);
};

export const update_account_label = async (data: IUpdateLabelDTO) => {
  return await axiosInstance.put<boolean>("/account/update_label", data);
};
