import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Github, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { pathVariants } from '@/lib/utils';
import { EnsoAnimatedButton } from '@/organisms/EnsoAnimatedButton';

export default function LoginV2() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      console.log('MY FORM DATA', email, password, 'DATA ', formData);
      await signIn(email, password);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
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
                  type="submit"
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
            <EnsoAnimatedButton 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
              loadingText="Signing in"
            >
              Sign in
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
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?{' '}
            </span>
            <Link href="/app/register" className="text-primary hover:underline">
              Sign up
            </Link>
            <span className="text-muted-foreground mx-2">•</span>
            <Link
              href="/app/forgot-password"
              className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
