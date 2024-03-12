import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAccountsContext } from "@/contexts/accounts.context";
import { AccountForm } from "./CreateAccountForm";
import { GoogleLoginUrlForm } from "./GoogleLoginUrlForm";
import { useState } from "react";

export function AccountSheet() {
  const { account, setAccount, setIsNew } = useAccountsContext();
  const [show, setShow] = useState<boolean>(true);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsNew(false);
      setShow(true);
      setAccount(undefined);
    }
  };

  const handleNewAccount = () => {
    setIsNew(true);
    setAccount({ _id: "", type: "GOOGLE" });
  };

  return (
    <Sheet open={!!account} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button onClick={handleNewAccount}>New Account</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Account</SheetTitle>
          <SheetDescription>Set account details</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col gap-5">
          {show && (
            <>
              <AccountForm onCreate={() => setShow(false)} />
              <Separator />
            </>
          )}
          {account?._id && <GoogleLoginUrlForm />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
