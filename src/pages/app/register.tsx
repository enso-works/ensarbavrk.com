import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnsoAnimatedButton } from '@/organisms/EnsoAnimatedButton';

import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pathVariants } from '@/lib/utils';
import { handleUnsupportedMethod } from '@/atoms/Toasts';
import { toastVariants } from '@/atoms/Toasts';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      await signUp(email, password);
      toast.success(
        'Registration successful! Please check your email to verify your account.'
      );
      router.push('/app/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-20">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1 ">
          <div className="flex flex-col items-center justify-center pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="h-30 w-full mb-4">
                <motion.svg
                  className="w-24 h-24 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <motion.path
                    stroke="currentColor"
                    d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    stroke="currentColor"
                    d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.path
                    stroke="currentColor"
                    d="m2 16 6 6"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.circle
                    stroke="currentColor"
                    cx="16"
                    cy="9"
                    r="2.9"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.circle
                    stroke="currentColor"
                    cx="6"
                    cy="5"
                    r="3"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </motion.svg>
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Join Enso&apos;s Expense Tracker
            </CardTitle>
          </div>
          <CardDescription>
            Create an account to join free and opensource super simple expense
            tracker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  disabled={isLoading}
                  className="transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                  className="transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading}
                  className="pr-10 transition-all duration-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading}
                  className="pr-10 transition-all duration-200"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>

            <EnsoAnimatedButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              loadingText="Creating account...">
              Create account
            </EnsoAnimatedButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button
              variant="outline"
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                handleUnsupportedMethod(
                  toastVariants.handleUnsupportedMethod('GitHub')
                )
              }>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                handleUnsupportedMethod(
                  toastVariants.handleUnsupportedMethod('Email')
                )
              }>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{' '}
            </span>
            <Link href="/app/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
