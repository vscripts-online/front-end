export interface IUser {
  id: number;
  email: string;
  used_size: string;
  total_drive: string;
}

export interface ISetTotalDriveDTO {
  user: number;
  size: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ILoginResponse {
  session: string;
}
