"use client";

import React, { useState } from "react";
import { Input, InputPassword } from "@/components/forms/input";
import Link from "next/link";
import { X } from "lucide-react";
import siteMetadata from "@/lib/siteMetadata";
import Animation from "@/components/animation";
import { Button } from "@/components/forms/button";
import { SigninSchema } from "../../../../packages/common";
import { useRouter } from "next/navigation";
import { signinUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import HashLoader from "react-spinners/HashLoader";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const route = useRouter();

  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      toast.success("User Signed in Successfully");
      localStorage.setItem("token", `Bearer ${data.token}`);
      route.push("./dashboard");
    },
    onError: (err) => {
      setEmail("");
      setPassword("");
      toast.error(err.message);
    },
  });

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = SigninSchema.safeParse({ email, password });
    if (!result.success) {
      // Map Zod errors to state
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      return;
    }

    // Clear errors
    setErrors({});

    signinMutation.mutate({ email, password });
  };

  return (
    <main className="bg-background_green flex h-[90vh] w-screen items-center justify-center md:h-screen">
      <section className="mx-6 w-full max-w-sm rounded-md bg-white p-4 shadow-md sm:max-w-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="relative inline-block">
            <h2 className="text-secondary relative text-2xl font-bold">
              <Animation type="underline" color="#93C5FD">
                Sign in
              </Animation>
            </h2>
          </div>
          <Link href="/" className="text-secondary hover:text-primary">
            <X size={22} />
          </Link>
        </div>
        <p className="mb-6 text-sm text-gray-700">{siteMetadata.slogan}</p>

        <form onSubmit={handleSignin} className="space-y-4">
          <Input
            title={"Email"}
            placeholder={"Enter your Email"}
            type={"email"}
            required
            value={email}
            error={errors.email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            title={"Password"}
            placeholder="Enter your password"
            value={password}
            required
            error={errors.password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-2">
            <Button
              text={
                signinMutation.isPending ? (
                  <div className="flex justify-center">
                    <HashLoader color="#ffffff" size={20} />
                  </div>
                ) : (
                  "Signin"
                )
              }
              type="submit"
              disabled={false}
            />
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Create an account?{" "}
            <Link
              href="/signup"
              className="text-primary-darkest hover:text-primary font-medium transition-all duration-300 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signin;
