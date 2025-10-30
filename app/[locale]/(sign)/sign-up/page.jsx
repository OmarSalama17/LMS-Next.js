"use client";
import React, { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [theme, setTheme] = useState(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      let signUpParams = {
        firstName,
        lastName,
        password,
        unsafeMetadata: { role: role },
      };

      if (emailOrUsername.includes("@")) {
        signUpParams.emailAddress = emailOrUsername;
      } else {
        signUpParams.username = emailOrUsername;
      }

      await signUp.create(signUpParams);

      if (signUpParams.emailAddress) {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
      } else {
        setError("Sign up with username requires email verification setup.");
      }
    } catch (err) {
      setError(
        err.errors[0]?.longMessage || "An error occurred. Please try again."
      );
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Clerk verify status not complete:", completeSignUp);
        setError("An unexpected error occurred. Please check console.");
      }
    } catch (err) {
      console.error("Verification Error Object:", err);

      let errorMessage = "Invalid code or request. Please try again.";

      if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
        errorMessage =
          err.errors[0].longMessage || err.errors[0].message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };
  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 bg-white dark:bg-slate-900 p-8 flex flex-col justify-center items-center">
              <div className="max-w-md w-full">
                <div className="absolute top-6 right-6 flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                    wb_sunny
                  </span>

                  <div className="relative inline-block w-10 align-middle select-none z-10">
                    <input
                      onClick={toggleTheme}
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      className="peer
                 absolute 
                 block 
                 w-6 h-6 
                 rounded-full 
                 bg-white 
                 border-2 
                 appearance-none 
                 cursor-pointer 
                 top-[-2px] 
                 left-0                 /* وضع البداية (شمال) */
                 transition-all 
                 duration-200 
                 ease-in
                 checked:left-4           /* الوضع لما تدوس (يمين) */
                "
                    />

                    <label
                      htmlFor="toggle"
                      className="toggle-label 
                 block 
                 overflow-hidden 
                 h-5 
                 rounded-full 
                 bg-slate-300 
                 cursor-pointer
                 peer-checked:bg-blue-500  /* اللون لما تدوس */
                 dark:bg-slate-700
                 dark:peer-checked:bg-blue-600
                "
                    ></label>
                  </div>

                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                    dark_mode
                  </span>
                </div>

                <Link
                  href="/"
                  className={`flex items-center justify-center gap-4 text-brand-blue mb-4`}
                >
                  <Image
                    width={130}
                    height={38}
                    className="w-[130px]"
                    src="https://res.cloudinary.com/dr2dnmx76/image/upload/v1761406970/EduProLogoDesign_pg337l.png"
                    alt="logo"
                  />
                </Link>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                  Create an Account
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">
                  Join our community and start learning today.
                </p>
                {error && (
                  <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                {!pendingVerification ? (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                          htmlFor="first-name"
                        >
                          First Name
                        </label>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                          id="first-name"
                          type="text"
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Omar"
                        />
                      </div>
                      <div>
                        <label
                          className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                          htmlFor="last-name"
                        >
                          Last Name
                        </label>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                          id="last-name"
                          type="text"
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Salama"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                        htmlFor="email-or-username"
                      >
                        Email or Username
                      </label>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                        id="email-or-username"
                        type="text"
                        value={emailOrUsername} 
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        placeholder="you@example.com or your_username"
                      />
                    </div>
                    <div>
                      <label
                        className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                        id="password"
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label
                        className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                        htmlFor="confirm-password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                        id="confirm-password"
                        type="password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label
                        className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                        htmlFor="role"
                      >
                        I am a...
                      </label>
                      <select
                        className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm appearance-none"
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 h-12 text-base shadow-md shadow-primary/40"
                      >
                        Sign Up
                      </button>
                    </div>

                    <div className="relative flex items-center my-2">
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                      <span className="mx-4 text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">
                        Or
                      </span>
                      <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignUp}
                      className="flex items-center justify-center gap-2 w-full h-12 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 text-base font-medium text-slate-700 dark:text-slate-200 shadow-sm"
                    >
                      <Image
                        width={20}
                        height={20}
                        alt="Google"
                        className="w-5 h-5"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHw0_qWarYzOjjO3t4giXywnRnLwfNjf4goPzC_qUrLYQ5EXqy4kM2mAMqGPbb16wvJUq6Eag9EtMQ61MEjFNCgRlm0CARXSaJoimVZWCmoZeTxoX-Zn0ZYwH2v_GZRBbohYaGBfBWKHlZhgtjcL0tZFwXRRLMKStG46CqicSq2EGg3PAcATJIHbqM_CvnmFuIZXJySGQdtkgVTFKEMySPo1G4Z3FiDhx-vS6Osg0T_HT6kHF02gYYMwyi_9lYXxBLIZjYeL5L0YmC" // استخدم اللينك الصح لو عندك
                      />
                      <span>Sign Up with Google</span>
                    </button>
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
                      Already have an account?{" "}
                      <a
                        href="/sign-in"
                        className="font-medium text-primary hover:underline"
                      >
                        Log in
                      </a>
                    </p>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleVerify}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                      Check your Email
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-center">
                      We sent a verification code to your email.
                    </p>
                    <div>
                      <label
                        htmlFor="code"
                        className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
                      >
                        Verification Code
                      </label>
                      <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-11 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 text-sm font-normal leading-normal shadow-sm"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 h-12 text-base shadow-md shadow-primary/40"
                      >
                        Verify Account
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="hidden lg:flex w-1/2 bg-primary/5 dark:bg-primary/10 p-12 flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 dark:bg-primary/20 rounded-full opacity-50"></div>
              <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full opacity-50"></div>
              <div className="z-10 text-center max-w-lg">
                <Image
                  width={512}
                  height={512}
                  alt="Students collaborating around a laptop."
                  className="rounded-xl shadow-2xl mb-8 w-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-vy_YsoeUyazPcWcEG5rjb6fcBOlaYx666760B6w9-Ad8Y9xu9Eic5x1L-W4tkrMcjWlX6QpS_-2ebdVhcyW3B7OW1Olqh4c3b1pS0hjLbnD5ngX51gAfnnE8MxrP7ub0X1B9xxx0P2DD7iKjVHP7j9qHTT94067AbwdpBzDjiODC9IUvW26wq7DKG5r7MImsJNlprwsRSIRbw0WbI6YY8IxBVYO6IxVQYvheUBEd6IOQCtoz9S6ie8nQu9Idl7EWLro9pnAlUWJk"
                />
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  Unlock Your Potential. Start Your Learning Journey Today.
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  Join thousands of learners and instructors on the premier
                  platform for online education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
