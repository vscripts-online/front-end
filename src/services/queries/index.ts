import { IFile, IGetFilesResponse } from "@/types/file";
import { IGetUsersUser } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { adminGetAccount, adminGetAccounts, adminGetFile, adminGetFiles, adminGetTotalStorage, adminGetUser, adminGetUsers, adminGetUsersFiles, getFile, getFiles } from "../api";

export const useAdminAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => adminGetAccounts(),
  });
};

export const useAdminAccount = (_id: string) => {
  return useQuery({
    queryKey: [_id],
    queryFn: () => adminGetAccount(_id),
    retry: false
  });
};

export const useUserFiles = () => {
  const [all, setAll] = useState<Map<string, IFile>>(new Map<string, IFile>())

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{
    desc: true,
    id: 'created_at'
  }]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const sort_by = sorting[0] && `${sorting[0].desc ? '-' : ''}${sorting[0].id}` || '-created_at'

  const query = useQuery({
    queryKey: ["user-files", pagination.pageIndex * pagination.pageSize, sort_by, ...columnFilters],
    queryFn: () => getFiles(pagination.pageIndex * pagination.pageSize, pagination.pageSize, sort_by, columnFilters),
    staleTime: 60000 * 5,
    gcTime: 60000 * 5,
  });


  useEffect(() => {
    if (query.data?.files) {
      setAll(old => {
        for (const file of query.data.files) {
          old.set(file._id, file)
        }

        return old
      })

    }
  }, [query?.data])

  return { ...query, pagination, setPagination, sorting, setSorting, columnFilters, setColumnFilters, all, setAll }
};

export const useFile = (file_id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user-files", file_id],
    queryFn: () => getFile(file_id),
    initialData: () => {
      const cache = queryClient.getQueryData<IGetFilesResponse>(["user-files"]);

      const item = cache?.files?.find((c) => c._id === file_id);
      return item;
    },
    retry() {
      return false;
    },
  });
};

export const useAdminFiles = () => {
  const [all, setAll] = useState<Map<string, IFile>>(new Map<string, IFile>())

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{
    desc: true,
    id: 'created_at'
  }]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const sort_by = sorting[0] && `${sorting[0].desc ? '-' : ''}${sorting[0].id}` || '-created_at'

  const query = useQuery({
    queryKey: ["files", pagination.pageIndex * pagination.pageSize, sort_by, ...columnFilters],
    queryFn: () => adminGetFiles(pagination.pageIndex * pagination.pageSize, pagination.pageSize, sort_by, columnFilters),
    staleTime: 60000 * 5,
    gcTime: 60000 * 5,
  });


  useEffect(() => {
    if (query.data?.files) {
      setAll(old => {
        for (const file of query.data.files) {
          old.set(file._id, file)
        }

        return old
      })

    }
  }, [query?.data])

  return { ...query, pagination, setPagination, sorting, setSorting, columnFilters, setColumnFilters, all, setAll }
};

export const useAdminUsers = () => {
  const [all, setAll] = useState<Map<number, IGetUsersUser>>(new Map<number, IGetUsersUser>())

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{
    desc: true,
    id: 'createdAt'
  }]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  let sort_by = sorting[0] && `${sorting[0].desc ? '-' : ''}${sorting[0].id}` || '-createdAt'

  sort_by = sort_by.replace('user_', '')
  if (['id', '-id'].includes(sort_by))
    sort_by = sort_by.replace('id', 'user')

  const query = useQuery({
    queryKey: ["users", pagination.pageIndex * pagination.pageSize, sort_by, ...columnFilters],
    queryFn: () => adminGetUsers(pagination.pageIndex * pagination.pageSize, pagination.pageSize, sort_by, columnFilters),
    staleTime: 60000 * 5,
    gcTime: 60000 * 5,
  });


  useEffect(() => {
    if (query.data?.users) {
      setAll(old => {
        for (const user of query.data.users) {
          old.set(user.user.id, user)
        }

        return old
      })

    }
  }, [query?.data])

  return { ...query, pagination, setPagination, sorting, setSorting, columnFilters, setColumnFilters, all, setAll }
};

export const useAdminUser = (userId: number) => {
  return useQuery({
    queryKey: ["user", `user-${userId}`],
    queryFn: () => adminGetUser(userId),
  });
};

export const useAdminUsersFiles = (userId: number) => {
  const [all, setAll] = useState<Map<string, IFile>>(new Map<string, IFile>())

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{
    desc: true,
    id: 'created_at'
  }]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const sort_by = sorting[0] && `${sorting[0].desc ? '-' : ''}${sorting[0].id}` || '-created_at'

  const query = useQuery({
    queryKey: ["user-files", userId, pagination.pageIndex * pagination.pageSize, sort_by, ...columnFilters],
    queryFn: () => adminGetUsersFiles(userId, pagination.pageIndex * pagination.pageSize, pagination.pageSize, sort_by, columnFilters),
    staleTime: 60000 * 5,
    gcTime: 60000 * 5,
  });


  useEffect(() => {
    if (query.data?.files) {
      setAll(old => {
        for (const file of query.data.files) {
          old.set(file._id, file)
        }

        return old
      })

    }
  }, [query?.data])

  return { ...query, pagination, setPagination, sorting, setSorting, columnFilters, setColumnFilters, all, setAll }
};

export const useAdminGetFile = (_id: string) => {
  return useQuery({
    queryKey: [_id],
    queryFn: () => adminGetFile(_id),
  });
};

export const useAdminTotalStorage = () => {
  return useQuery({
    queryKey: ['total_storage'],
    queryFn: () => adminGetTotalStorage(),
  });
};