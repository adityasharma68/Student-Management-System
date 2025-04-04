"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-rajSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 animate-fadeIn transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              className="animate-pulse"
            />
            SUG
          </h1>
          <h2 className="text-gray-400 transition-all duration-300 hover:text-gray-600">
            Sign in to your account
          </h2>

          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500 transition-all duration-200 hover:text-gray-700">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-400 hover:ring-blue-300"
            />
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500 transition-all duration-200 hover:text-gray-700">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-400 hover:ring-blue-300"
            />
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-inner"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
