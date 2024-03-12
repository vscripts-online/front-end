import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccountsContext } from "@/contexts/accounts.context";
import { useLoginUrlGoogle } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function GoogleLoginUrlForm() {
  const { account } = useAccountsContext();

  const loginUrlGoogleFormSchema = z.object({
    _id: z.string().min(10),
    client_id: z.string().min(10),
    client_secret: z.string().min(10),
  });

  const loginUrlGoogleForm = useForm<z.infer<typeof loginUrlGoogleFormSchema>>({
    resolver: zodResolver(loginUrlGoogleFormSchema),
    defaultValues: {
      _id: account?._id,
      client_id: account?.client_id || "",
      client_secret: account?.client_secret || "",
    },
  });

  const loginUrlGoogleMutation = useLoginUrlGoogle({
    onSuccess(data) {
      window.open(data.data.value, "_blank");
    },
  });

  const onSubmit = (data: z.infer<typeof loginUrlGoogleFormSchema>) => {
    loginUrlGoogleMutation.mutate(data);
  };

  return (
    <Form {...loginUrlGoogleForm}>
      <form onSubmit={loginUrlGoogleForm.handleSubmit(onSubmit)}>
        <FormField
          control={loginUrlGoogleForm.control}
          name="_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Id</FormLabel>
              <FormControl>
                <Input {...field} value={account?._id} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginUrlGoogleForm.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginUrlGoogleForm.control}
          name="client_secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Secret</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button
            type="submit"
            className="mt-3"
            disabled={loginUrlGoogleMutation.isPending}
          >
            {loginUrlGoogleMutation.isPending && (
              <Loader2 className="animate-spin ml-auto" />
            )}
            Login
          </Button>
          <p>Refresh page after successfull</p>
        </div>
      </form>
    </Form>
  );
}
