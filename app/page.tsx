"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleGoogleLogin() {
    router.push("/dashboard");
  }

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <header className="top-header">
        <div className="header-left">
          <Image
            src="/images/Blackbuck-logo.png"
            alt="Blackbuck Logo"
            width={140}
            height={40}
            priority
          />
        </div>
        <div className="header-right">
          Help 08046481828
        </div>
      </header>

      {/* LOGIN CARD */}
      <div className="login-wrapper">
        <div className="login-card">
          {/* CENTER LOGO */}
          <div className="login-logo">
            <Image
              src="/images/Blackbuck-logo.png"
              alt="Blackbuck Logo"
              width={180}
              height={50}
            />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Sign in with Google
          </button>

          <p className="terms">
            By logging in, you agree to our
            <a href="#"> terms of use </a>
            and
            <a href="#"> privacy policies</a>
          </p>
        </div>
      </div>
    </div>
  );
}
