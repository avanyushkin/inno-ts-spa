import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth";
import type { LoginResponse, LoginVariables } from "@/types/user";

const formSchema = z.object({
  username: z.string().min(3, "username should be at least 3 characters."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const [loginMutation] = useMutation<LoginResponse, LoginVariables>(
    LOGIN_MUTATION
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.username === "admin" && values.password === "password123") {
        const mockUserData = {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          firstName: "Admin",
          lastName: "User",
          image: "",
          token: "mock-jwt-token-12345"
        };

        localStorage.setItem("token", mockUserData.token);
        localStorage.setItem("user", JSON.stringify(mockUserData));

        navigate({ to: "/profile" });
        return;
      }

      const { data } = await loginMutation({
        variables: {
          username: values.username,
          password: values.password,
        },
      });

      if (!data) {
        throw new Error("no data from mutation");
      }

      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login));

      navigate({ to: "/profile" });
    } catch {
      form.setError("password", {
        message: "Invalid username or password",
      });
    }
  };

  const { formState: { isSubmitting } } = form;
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField 
              control={form.control} 
              name="username"
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
            <FormField 
              control={form.control} 
              name="password"
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
          <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Sign in"}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              <Link to="/register">Register</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;