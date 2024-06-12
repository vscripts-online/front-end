import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { accountCreateFormSchema } from "@/schemas/account_create";
import { useAdminCreateAccount } from "@/services/mutations";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_admin/admin/accounts/create/")({
  component: Page,
});

function Page() {
  const { mutate } = useAdminCreateAccount({
    onError(error, _variables, _context) {
      console.log("error", error);
    },
  });

  function handleSubmit(values: z.infer<typeof accountCreateFormSchema>) {
    mutate(values);
  }

  return (
    <AutoForm formSchema={accountCreateFormSchema} onSubmit={handleSubmit}>
      <AutoFormSubmit>Create</AutoFormSubmit>
    </AutoForm>
  );
}
