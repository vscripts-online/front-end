export enum AccountTypes {
  GOOGLE = 'GOOGLE',
}

export interface IAccount {
  _id: string;
  type: AccountTypes;
  label?: string;
  client_id?: string;
  client_secret?: string;
  code?: string;
  refresh_token?: string;
  access_token?: string;
  access_token_expiry_time?: number;
  storage_size?: string;
  available_size?: string;
  sync_time?: string;
}

export type ICreateAccountDTO = Pick<IAccount, "type" | "label" | 'client_id' | 'client_secret'>;
export type IDeleteAccountDTO = Pick<IAccount, "_id">;
export type ILoginUrlGoogleDTO = Pick<IAccount, "_id">;

export interface ILoginUrlGoogleDTOResponse {
  value: string;
}

export interface ITotalStorageResponse {
  available_storage: string;
  total_storage: string;
  total_accounts: number;
}

export interface IUpdateLabelDTO {
  _id: string;
  label?: string;
}

export interface ISyncAccountResponse {
  available_size: string
  storage_size: string
}