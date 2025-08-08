import React from "react";
import AuthLayout from "./AuthLayout";
import AuthForm from "../../../components/authComponent/AuthForm";

export default function SignIn() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to access your healthcare dashboard">
      <AuthForm type="signin" />
    </AuthLayout>
  );
}