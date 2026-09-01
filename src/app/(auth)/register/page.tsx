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
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 overflow-hidden">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-mb-sans tracking-tight text-lg sm:text-xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription className="tracking-tight font-medium">
            Start delivering webhooks in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="John Doe"
                className="py-6"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@company.com"
                className="py-6"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="At least 8 characters"
                className="py-6"
                required
              />
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full py-6 cursor-pointer"
            >
              Create account
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
              onClick={() => (window.location.href = "/login")}
            >
              Login
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              href="/terms-condition"
              className="underline font-medium text-neutral-700 dark:text-neutral-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline font-medium text-neutral-700 dark:text-neutral-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
