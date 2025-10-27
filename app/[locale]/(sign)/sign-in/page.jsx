"use client";

import { useState , useEffect } from 'react';
import { useSignIn, useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Page() {
  //hooks theme and signin
  const [theme, setTheme] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const router = useRouter();


//start-theme
      useEffect(() => {
      const storedTheme = localStorage.getItem('theme') || 'light'; 
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, []);
  
    const toggleTheme = () => {
      const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      
      setTheme(newTheme); 
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
//end-theme


  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!isLoaded) return; 

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        setError('');
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard'); 
      } else {
        console.log(result);
      }
    } catch (err) {
      setError(err.errors[0]?.longMessage || 'حدث خطأ ما');
      console.error(JSON.stringify(err, null, 2));
    }
  };


  return (
    <div className=" flex flex-col lg:flex-row h-screen">
      {/* الجزء الشمال */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-slate-900 p-8 flex flex-col justify-center items-center">
        <div className="max-w-md w-full">
                          <div className="absolute top-6 right-6 flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                    wb_sunny
                  </span>

                  {/* الكونتينر بتاع الزرار */}
                  <div className="relative inline-block w-10 align-middle select-none z-10">
                    {/* الدايرة اللي بتتحرك (Handle) */}
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

                    {/* الخلفية (Track) */}
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
            <Link href="/" className={`flex items-center gap-4 justify-center gap-4 text-brand-blue mb-4`}>
              <img className="w-[130px]" src="/EduPro Logo Design.png" alt="" />
            </Link>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-center">
            Sign in to unlock a world of knowledge.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 pl-10 text-sm font-normal leading-normal"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 block"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-12 placeholder:text-slate-400 dark:placeholder-slate-500 p-3 pl-10 pr-10 text-sm font-normal leading-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-transparent text-primary focus:ring-2 focus:ring-primary/50"
                />
                <label
                  htmlFor="remember-me"
                  className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal"
                >
                  Remember for 30 days
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              // 8. ربط الزرار بالـ loading state
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 h-12 text-sm shadow-md shadow-primary/30 disabled:opacity-50"
            >
                          {isLoading ? "Signing In..." : "Sign In"}           {" "}
            </button>

            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="mx-4 text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">
                Or
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  name: "Google",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHw0_qWarYzOjjO3t4giXywnRnLwfNjf4goPzC_qUrLYQ5EXqy4kM2mAMqGPbb16wvJUq6Eag9EtMQ61MEjFNCgRlm0CARXSaJoimVZWCmoZeTxoX-Zn0ZYwH2v_GZRBbohYaGBfBWKHlZhgtjcL0tZFwXRRLMKStG46CqicSq2EGg3PAcATJIHbqM_CvnmFuIZXJySGQdtkgVTFKEMySPo1G4Z3FiDhx-vS6Osg0T_HT6kHF02gYYMwyi_9lYXxBLIZjYeL5L0YmC",
                },
                {
                  name: "Facebook",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtwYFybn9Mnew9ndQ0oTNN1ixYQOI5eA3OhBXlYX0MMuvj6nJqHX_Av5aAxo4cb1D-swxsF7hB5DcVkz8Xf0gimfSpEEqs_VWYh4x8k618_OHPnWZXuJIqtwzOxqkE6zFYVMYVEhuLVwjLwx91YmM9hZ74OgTzks3BAXULpEEWq-889Ic0RtiW9-4ajqXlUB3I9Yb4znkK0WaZHe1FBb3aK8K-0SzdbjWMB0tWJc-5TxkP3dnA_ArXmwUUT3cP-dw1kkvCYDnbOKLp",
                },
                {
                  name: "LinkedIn",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbad4eOYbClb3gT_CghMcpmODkerfPkW4fAEKc4vkmW6kpqKOyltQ_Kp5vd4ufrBjalYb7sHGGoi5qQ9bwogjWUAEwT79_Ge0lNfM3pTYfxJxTqwqhkvh8ZOU2EJ2pAYuW-kc7jE5lDa3F9mp95bwW11u9Q9n-GrStFVVNsCYdGaIT6lt-9CV6h6WP_xmDS5ZzAwp8mVtJmbgBfkVMFSicNMypHKnqxZ-x6TIxG45B37fBrxBy9w-IZAVRnNbEpxavbK--oiRXctZj",
                },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  className="flex items-center justify-center gap-2 w-full h-12 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  <img alt={social.name} src={social.img} className="w-5 h-5" />
                  <span>{social.name}</span>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <a className="font-medium text-primary hover:underline" href="#">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* الجزء اليمين */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 dark:bg-primary/5 p-8 flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full"></div>
        <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-primary/20 dark:bg-primary/10 rounded-full"></div>
        <div className="z-10 text-center max-w-lg">
          <img
            alt="A person receiving guidance on a computer."
            className="rounded-xl shadow-2xl mb-8 w-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCndtY2P4r5XHeySigVH4XOexPj-W1YoEk-Pc6VN2aZYCWzZd8JuqY3PTNzQJ--hqizMsmVn-67hgc4Sokbd15ns1hsToEaGsuxU3VOA_3lwEEkvtq5QhYDRQhcjhuPYjeB9ndMYHB-SA5a4WoB8rL4d_vG5XEsQ64VKpkJ3xPWOslfpY6rPjlHz2zwOTJbzhFYPBfsjC0gLQrM4WVT-DH9nVCXnfR3EFB4eoYeJWhKxPJV_HXeKQzEnheo8q08CCFyQW7VfyHw4_LB"
          />
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            "The best investment you can make is in yourself."
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            - A Wise Investor
          </p>
        </div>
      </div>
    </div>
  );
}
