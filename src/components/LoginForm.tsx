import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { login } from "@/api/auth.ts";
const formSchema = z.object({
  username: z.string().min(3, "username should be at least 3 characters."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const LoginForm = () => {
  const navigate = useNavigate ();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => { // add api auth
   //console.log(values);
    try {
      const data = await login (values.username, values.password);
      localStorage.setItem ("token", data.token);
      navigate ({to: "/profile"});
    } catch (err) {
      form.setError ("password", {
        message: "invalid password or username",
      });
    }
  };
  const {handleSubmit, control, formState: {isSubmitting}} = form;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your username below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField control={form.control} name="username"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="password"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className = "flex gap-2">
            <Button type = "submit" className = "flex-1" disabled = {isSubmitting}>
              {isSubmitting ? "loading..." : "Sign in"}
            </Button>
            <Button type = "button" variant = "outline" className = "flex-1">
              <Link to = "/register">Register</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;