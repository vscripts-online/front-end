import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toPascalCase } from "@/lib/utils";
import { useLogin, useRegister } from "@/services/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

enum TypeEnum {
  register = "register",
  login = "login",
}

interface TabContentFormProps {
  type: TypeEnum;
}

function TabContentForm(props: TabContentFormProps) {
  const { type } = props;

  const value = toPascalCase(type);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const mutation = type === TypeEnum.login ? loginMutation : registerMutation;

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSign = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  return (
    <TabsContent value={type}>
      <Card>
        <CardHeader>
          <center>
            <CardTitle>{value}</CardTitle>
          </center>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSign)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center mt-5">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && (
                    <Loader2 className="animate-spin ml-auto" />
                  )}
                  {value}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Sign</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabContentForm type={TypeEnum.login} />
          <TabContentForm type={TypeEnum.register} />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
