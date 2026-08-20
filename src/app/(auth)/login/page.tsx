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

export default function LoginPage() {
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="py-6"
                required
              />
            </div>
            <Button
              variant="default"
              type="submit"
              className="w-full py-6 cursor-pointer"
            >
              Take me in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-start">
          <div className="w-full flex justify-between">
            <Button
              variant="ghost"
              className="cursor-pointer text-xs font-medium flex gap-1 hover:gap-2 transition-all"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer text-xs font-medium flex gap-1 hover:gap-2 transition-all"
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
