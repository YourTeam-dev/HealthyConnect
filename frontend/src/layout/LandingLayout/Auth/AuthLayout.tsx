import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: marketing panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#008CBA] text-white items-center justify-center px-10">
        <div className="w-full max-w-lg">
          <div
            className="bg-white shadow-md w-64 h-40 mb-6 flex items-center justify-center text-[#008CBA] font-semibold text-lg"
            style={{ borderRadius: "8px" }}
          >
            Virtual Consultation
          </div>
          <h2 className="text-white font-semibold text-xl mb-2">
            Your Health Journey Starts Here
          </h2>
          <p className="text-sm text-white/95 mb-6 max-w-md">
            Connect with licensed healthcare professionals from the comfort of your home. Quality care is just a click away.
          </p>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-bold text-white">10K+</p>
              <p>Happy Patients</p>
            </div>
            <div>
              <p className="font-bold text-white">500+</p>
              <p>Doctors</p>
            </div>
            <div>
              <p className="font-bold text-white">24/7</p>
              <p>Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 sm:px-10 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="text-sm text-[#008CBA] mb-4 inline-block">
            &larr; Back to role selection
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-[#008CBA] rounded-full inline-block" />
            <h1 className="text-3xl font-bold text-[#333]">HealthConnect</h1>
          </div>

          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-[#666] mb-6">{subtitle}</p>}

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}