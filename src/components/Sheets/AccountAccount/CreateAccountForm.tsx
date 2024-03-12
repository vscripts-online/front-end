import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccountsContext } from "@/contexts/accounts.context";
import { useCreateAccount } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  onCreate: () => void;
}

export function AccountForm(props: Props) {
  const { account, setAccount, isNew } = useAccountsContext();

  const createAccountFormSchema = z.object({
    type: z.string().regex(/^GOOGLE$/),
    label: z.optional(z.string().max(320)),
  });

  const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      type: "GOOGLE",
      label: account?.label,
    },
  });

  const createAccountMutation = useCreateAccount({
    onSuccess(data) {
      setAccount(data.data);
      props.onCreate();
    },
  });

  function onSubmit(data: z.infer<typeof createAccountFormSchema>) {
    createAccountMutation.mutate(data);
  }

  return (
    <Form {...createAccountForm}>
      <form onSubmit={createAccountForm.handleSubmit(onSubmit)}>
        <FormField
          control={createAccountForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="GOOGLE" {...field} disabled />
              </FormControl>
              <FormDescription>Must be GOOGLE</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createAccountForm.control}
          name="label"
          render={({ field }) => (
            <FormItem className="pt-3">
              <FormLabel>Label (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: account@gmail.com"
                  {...field}
                  disabled={!!account?._id}
                />
              </FormControl>
              <FormDescription>
                Optionally you can label this account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isNew && (
          <div className="text-right">
            <Button
              type="submit"
              className="mt-3"
              disabled={createAccountMutation.isPending}
            >
              {createAccountMutation.isPending && (
                <Loader2 className="animate-spin ml-auto" />
              )}
              Create
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
