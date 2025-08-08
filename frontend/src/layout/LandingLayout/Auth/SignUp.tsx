import React from "react";
import AuthLayout from "./AuthLayout";
import AuthForm from "../../../components/authComponent/AuthForm";

export default function SignUp() {
  return (
    <AuthLayout title="Create Your Account" subtitle="Join thousands of patients who trust HealthConnect">
      <AuthForm type="signup" />
    </AuthLayout>
  );
}