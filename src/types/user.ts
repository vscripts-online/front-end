import { IUser } from "@/auth";

export interface IUserMetadata {
  admin?: boolean;
  total?: number;
  used?: number;
}

export interface IGetUsersUser {
  metadata: IUserMetadata;
  user: Pick<IUser, 'avatar' | 'email' | 'id' | 'name'>;
  createdAt: string
}

export interface IGetUsersResponse {
  status: boolean
  users: IGetUsersUser[]
  count: number
}

export type IGetUsersUserResponse = IGetUsersUser | null;
export type IUpdateTotal = { user: number, total: number }