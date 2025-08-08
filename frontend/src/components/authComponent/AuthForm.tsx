import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { login, register } from "../../Api/auth.api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const isSignUp = type === "signup";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (formData.password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
       await register({ email: formData.email, password: formData.password });
      } else {
        await login(formData);
      }
      navigate("/");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors && err.response.data.errors[0]?.msg) ||
        "Something went wrong";
      setError(msg);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isSignUp && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#666] mb-1">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#666] mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#666] mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#666] mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
        )}

        {!isSignUp && (
          <div className="flex justify-between items-center text-sm mb-2">
            <a href="#" className="text-[#008CBA] hover:underline">Forgot password?</a>
            <label className="text-[#666] flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
        )}

        <Button
          type="submit"
          className={
            isSignUp
              ? "w-full bg-[#007BA3] hover:bg-[#006688] text-black rounded-lg py-2 font-medium transition"
              : "w-full bg-[#008CBA] hover:bg-[#007BAA] text-black rounded-lg py-2 font-medium transition"
          }
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </Button>

        <div className="text-center text-sm text-[#999]">or</div>

        <Button
          type="button"
          className="w-full bg-[#007BA3] hover:bg-[#006688] text-black rounded-lg py-2 font-medium transition flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </Button>
      </form>

      <div className="text-sm text-center mt-2">
        {type === "signin" ? (
          <p>
            Don’t have an account? <Link to="/signup" className="text-[#008CBA] font-medium">Sign up</Link>
          </p>
        ) : (
          <p>
            Already have an account? <Link to="/signin" className="text-[#008CBA] font-medium">Sign in</Link>
          </p>
        )}
      </div>

      <p className="text-xs text-center mt-2 text-[#999]">
        By creating an account, you agree to our <a href="#" className="text-[#008CBA]">Terms</a> & <a href="#" className="text-[#008CBA]">Privacy Policy</a>.
      </p>
    </>
  );
}