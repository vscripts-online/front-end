import AccountsDashbard from "@/pages/AdminDashboard/Accounts";
import { IAccount } from "@/types/account";
import { createContext, useContext, useState } from "react";

export interface IAccountsContext {
  account?: IAccount;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | undefined>>;
  isNew?: boolean;
  setIsNew: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const AccountsContext = createContext({} as IAccountsContext);

export const AccountsProvider = () => {
  const [account, setAccount] = useState<IAccount>();
  const [isNew, setIsNew] = useState<boolean>();

  const value = {
    account,
    setAccount,
    isNew,
    setIsNew,
  };

  return (
    <AccountsContext.Provider value={value}>
      <AccountsDashbard />
    </AccountsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountsContext = () => useContext(AccountsContext);
