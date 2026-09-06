"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = (await authApi.login(formData)) as any;
      useAuthStore.getState().setUser(res.user);
      toast.add({
        type: "success",
        description: "Logged in successfully",
      });
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.add({
        type: "error",
        description: message,
        priority: "high",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-5 overflow-hidden">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="tracking-tight text-lg sm:text-xl font-semibold">
            Welcome back! We missed you😭
          </CardTitle>
          <CardDescription className="tracking-tight font-medium">
            Enter your details. We&apos;ll take it from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@company.com"
                className="py-6"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="At least 8 characters"
                  className="py-6 pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full py-6 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-1 items-center">
                  <Spinner />
                  Logging in...
                </div>
              ) : (
                "Take me in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-start">
          <div className="w-full flex justify-between">
            <Button
              variant="ghost"
              className="cursor-pointer text-xs font-medium flex gap-1 hover:gap-2 transition-all"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer text-xs font-medium flex gap-1 hover:gap-2 transition-all"
              onClick={() => (window.location.href = "/register")}
            >
              Signup
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
