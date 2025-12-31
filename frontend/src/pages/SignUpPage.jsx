import { useState } from "react";
import { Link } from "react-router";
import Logo from "../components/Logo";
import useSignUp from "../hooks/useSignUp";
import toast from "react-hot-toast";
import { Loader2, User, Mail, Lock, Check } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signupMutation, isPending, error } = useSignUp();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signupMutation(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-base-100 to-base-100"></div>

      <div className="flex bg-base-200/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full border border-white/5 relative z-10">

        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl overflow-hidden shadow-lg shadow-primary/10">
                <Logo className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold font-mono tracking-tighter text-white">
                Zync
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl border border-error/20 bg-error/10 text-error-content shadow-lg backdrop-blur-sm text-sm p-3">
              <span>{error?.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control space-y-1.5">
              <label className="text-sm font-medium text-base-content/70 ml-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-lg w-full glass-input rounded-xl placeholder:text-base-content/30 pl-11 text-sm bg-base-100/50"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none">
                  <User className="size-5" />
                </div>
              </div>
            </div>

            <div className="form-control space-y-1.5">
              <label className="text-sm font-medium text-base-content/70 ml-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-lg w-full glass-input rounded-xl placeholder:text-base-content/30 pl-11 text-sm bg-base-100/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none">
                  <Mail className="size-5" />
                </div>
              </div>
            </div>

            <div className="form-control space-y-1.5">
              <label className="text-sm font-medium text-base-content/70 ml-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-lg w-full glass-input rounded-xl placeholder:text-base-content/30 pl-11 text-sm bg-base-100/50"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none">
                  <Lock className="size-5" />
                </div>
              </div>
              <p className="text-xs text-base-content/50 ml-1">
                Must be at least 6 characters
              </p>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" required />
                <span className="text-sm opacity-80">
                  I agree to the <span className="text-primary hover:underline">Terms</span> & <span className="text-primary hover:underline">Privacy Policy</span>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full rounded-xl text-base font-semibold shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 border-none bg-primary text-white mt-2" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:text-primary-focus transition-colors hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-base-100 to-base-200 relative items-center justify-center p-12 border-l border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-40"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>

          <div className="relative z-10 text-center max-w-sm">
            <div className="mb-6 inline-flex p-4 rounded-full bg-base-100/50 ring-1 ring-white/10 shadow-xl backdrop-blur-xl">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Logo className="size-16" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Join the Community</h3>
            <p className="text-base-content/60 leading-relaxed text-sm">
              Start your journey into seamless global communication today.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
