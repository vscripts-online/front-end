import { IAccount, ICreateAccountDTO, ISyncAccountResponse, ITotalStorageResponse } from "@/types/account";
import { IFile, IGetFilesResponse, IUpdateFileDTO, IUploadDTO } from "@/types/file";
import { IGetUsersResponse, IGetUsersUserResponse, IUpdateTotal } from "@/types/user";
import { ColumnFiltersState } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";

const { VITE_API_URL } = import.meta.env;

const BASE_URL = VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log("error", error);
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || ["Error"];
      throw Array.isArray(message) ? message[0] : message;
    }
  }
);

export const upload = async (data: IUploadDTO) => {
  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("file_name", data.file_name);
  formData.append("headers", JSON.stringify(data.headers));

  return await axiosInstance.post<IFile>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress(progressEvent) {
      data.progress && data.progress(progressEvent);
    },
  });
};

export const getFiles = async (skip = 0, limit = 20, sortBy = 'created_at', filters: ColumnFiltersState = []) => {
  await new Promise(r => setTimeout(r, 1000))

  const url = new URL('https://backend/user/files')

  url.searchParams.set('skip', skip + '')
  url.searchParams.set('limit', limit + '')
  url.searchParams.set('sortBy', sortBy + '')

  for (const filter of filters) {
    if (filter.id === 'created_at') {
      const value = filter.value as { from?: Date, to?: Date } | undefined
      if (value?.from)
        url.searchParams.set('created_at_gte', value.from.toISOString())
      if (value?.to)
        url.searchParams.set('created_at_lte', value.to.toISOString())

      continue
    }

    if (filter.id === 'size') {
      const value = filter.value as { min?: string, max?: string } | undefined
      if (value?.min)
        url.searchParams.set('size_gte', value.min)
      if (value?.max)
        url.searchParams.set('size_lte', value.max)

      continue
    }

    url.searchParams.set(filter.id, filter.value as string)
  }


  return (await axiosInstance.get<IGetFilesResponse>(`${url.pathname}${url.search}`)).data;
};

export const getFile = async (_id: string) => {
  return (await axiosInstance.get<IFile>("/user/files/" + _id)).data;
};

export const updateFile = async (_id: string, data: IUpdateFileDTO) => {
  return await axiosInstance.put<IFile>("/user/files/" + _id, data);
};

export const adminUpdateFile = async (_id: string, data: IUpdateFileDTO) => {
  return await axiosInstance.put<IFile>("/files/file/" + _id, data);
};

export const deleteFile = async (id: string) => {
  return await axiosInstance.delete<IFile>("/user/files/" + id);
};

export const adminDeleteFile = async (id: string) => {
  return await axiosInstance.delete<IFile>("/files/file/" + id);
};

export const adminGetAccounts = async () => {
  return (await axiosInstance.get<IAccount[]>("/account/accounts?sort_by=-_id")).data;
};

export const adminGetAccount = async (_id: string) => {
  return (await axiosInstance.get<IAccount>(`/account/account/${_id}`)).data;
};

export const adminCreateAccount = async (data: ICreateAccountDTO) => {
  return await axiosInstance.post<{ value: string }>("/account/new_account", data);
};

export const adminGetFiles = async (skip = 0, limit = 20, sortBy = 'created_at', filters: ColumnFiltersState = []) => {
  await new Promise(r => setTimeout(r, 1000))

  const url = new URL('https://backend/files')

  url.searchParams.set('skip', skip + '')
  url.searchParams.set('limit', limit + '')
  url.searchParams.set('sortBy', sortBy + '')

  for (const filter of filters) {
    if (filter.id === 'created_at') {
      const value = filter.value as { from?: Date, to?: Date } | undefined
      if (value?.from)
        url.searchParams.set('created_at_gte', value.from.toISOString())
      if (value?.to)
        url.searchParams.set('created_at_lte', value.to.toISOString())

      continue
    }

    if (filter.id === 'updated_at') {
      const value = filter.value as { from?: Date, to?: Date } | undefined
      if (value?.from)
        url.searchParams.set('updated_at_gte', value.from.toISOString())
      if (value?.to)
        url.searchParams.set('updated_at_lte', value.to.toISOString())

      continue
    }

    if (filter.id === 'size') {
      const value = filter.value as { min?: string, max?: string } | undefined
      if (value?.min)
        url.searchParams.set('size_gte', value.min)
      if (value?.max)
        url.searchParams.set('size_lte', value.max)

      continue
    }

    url.searchParams.set(filter.id, filter.value as string)
  }


  return (await axiosInstance.get<IGetFilesResponse>(`${url.pathname}${url.search}`)).data;
};

export const adminGetUsers = async (skip = 0, limit = 20, sort = '-createdAt', filters: ColumnFiltersState = []) => {
  await new Promise(r => setTimeout(r, 1000))

  const url = new URL('https://backend/user/users')
  url.searchParams.set('skip', skip + '')
  url.searchParams.set('limit', limit + '')
  url.searchParams.set('sort', sort + '')

  for (const filter of filters) {
    if (filter.id === 'createdAt') {
      const value = filter.value as { from?: Date, to?: Date } | undefined
      if (value?.from)
        url.searchParams.set('created_at_gte', value.from.toISOString())
      if (value?.to)
        url.searchParams.set('created_at_lte', value.to.toISOString())

      continue
    }

    url.searchParams.set(filter.id.replace('user_', ''), filter.value as string)
  }


  return (await axiosInstance.get<IGetUsersResponse>(`${url.pathname}${url.search}`)).data;
};

export const adminGetUser = async (userId: number) => {
  return (await axiosInstance.get<IGetUsersUserResponse>(`/user/users/${userId}`)).data;
};

export const adminGetUsersFiles = async (userId: number, skip = 0, limit = 20, sortBy = 'created_at', filters: ColumnFiltersState = []) => {
  await new Promise(r => setTimeout(r, 1000))

  const url = new URL(`https://backend/user/users/${userId}/files`)

  url.searchParams.set('skip', skip + '')
  url.searchParams.set('limit', limit + '')
  url.searchParams.set('sort', sortBy + '')

  for (const filter of filters) {
    if (filter.id === 'created_at') {
      const value = filter.value as { from?: Date, to?: Date } | undefined
      if (value?.from)
        url.searchParams.set('created_at_gte', value.from.toISOString())
      if (value?.to)
        url.searchParams.set('created_at_lte', value.to.toISOString())

      continue
    }

    if (filter.id === 'size') {
      const value = filter.value as { min?: string, max?: string } | undefined
      if (value?.min)
        url.searchParams.set('size_gte', value.min)
      if (value?.max)
        url.searchParams.set('size_lte', value.max)

      continue
    }

    url.searchParams.set(filter.id, filter.value as string)
  }


  return (await axiosInstance.get<IGetFilesResponse>(`${url.pathname}${url.search}`)).data;
};

export const adminGetFile = async (_id: string) => {
  return (await axiosInstance.get<IFile>(`/files/file/${_id}`)).data;
};

export const adminUpdateUserTotal = async (params: IUpdateTotal) => {
  return axiosInstance.post<boolean>(`/user/users/${params.user}/total`, { size: params.total })
};

export const adminGetTotalStorage = async () => {
  return (await axiosInstance.get<ITotalStorageResponse>(`/account/total_storage`)).data;
};

export const adminSyncAccount = async (_id: string) => {
  return await axiosInstance.post<ISyncAccountResponse>(`/account/sync_size/${_id}`)
};

export const adminDeleteAccount = async (_id: string) => {
  return await axiosInstance.delete<IAccount>(`/account/${_id}`)
};

export const adminUpdateLabel = async (_id: string, label?: string) => {
  return await axiosInstance.put<{ value: boolean }>(`/account/${_id}`, { label })
};

export const getAvailable = async (size: number) => {
  return await axiosInstance.post<boolean>(`/upload/available`, { size })
};