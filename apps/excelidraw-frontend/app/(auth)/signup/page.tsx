import Signup from "@/components/auth/signup";
import getPageMetadata from "@/lib/getPageMetadata";
import React from "react";

export const metadata = getPageMetadata({
  title: "Sign Up",
  description:
    "Create a new account on newer Excelidraw and start collaborating in real-time.",
});

const SignUpPage = () => {
  return <Signup />;
};

export default SignUpPage;
