import { CalendarDays, Clock, Eye, Github, X, Linkedin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const Footer = () => {
  return (
    <footer className="mt-24 w-full bg-gray-100 dark:bg-gray-800">
      <div className="max-w-[40.5rem] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Enso's Blog</h2>
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
          <p>&copy; {new Date().getFullYear()} Enso. writtings</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/spendings" className="hover:underline">
                  Spendings
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:underline">
                  Projects
                </Link>
              </li><li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
