"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { toast } from "sonner";

import { register } from "@/actions/user.action";
import { redirect } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await register(values);

    if (!response) {
      toast.error("Register Error", {
        description: "Please contact Administrator",
      });

      return;
    }

    toast.success("Register Success", {
      description: "Please check your email for verify",
    });

    form.reset();
    setLoading(false);

    redirect("/auth/login");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="john doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/auth/login">Login</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
