export interface IAccount {
  _id: string;
  type: string;
  label?: string;
  client_id?: string;
  client_secret?: string;
  code?: string;
  refresh_token?: string;
  access_token?: string;
  access_token_expiry_time?: number;
  storage_size?: string;
  available_size?: string;
}

export type ICreateAccountDTO = Pick<IAccount, "type" | "label">;
export type IDeleteAccountDTO = Pick<IAccount, "_id">;
export type ILoginUrlGoogleDTO = Pick<
  IAccount,
  "_id" | "client_id" | "client_secret"
>;

export interface ILoginUrlGoogleDTOResponse {
  value: string;
}

export interface ITotalStorageResponse {
  available_storage: string;
  total_storage: string;
  total_accounts: number;
}
