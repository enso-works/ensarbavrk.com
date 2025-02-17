import { CalendarDays, Clock, Eye, Github, X, Linkedin, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/AuthContext';

export const Footer = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <footer className="mt-24 w-full bg-gray-100 dark:bg-gray-800">
      <div className="max-w-[40.5rem] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Enso's playground</h2>
            <p className="text-muted-foreground">
              Exploring code, design, and the great outdoors.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/enso-works"
                target="_blank"
                rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://x.com/enso-works"
                target="_blank"
                rel="noopener noreferrer">
                <X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://linkedin.com/in/enso"
                target="_blank"
                rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; Wathever year it is | Enso.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex items-center space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <li>
                <Link href="/thoughts" className="hover:underline">
                  Thoughts
                </Link>
              </li>
              <li>
                <Link href="/spendings" className="hover:underline">
                  Spendings
                </Link>
              </li>
              {user && (
                <li>
                  <Button 
                    variant="secondary"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
