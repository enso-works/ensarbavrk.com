'use client';

import {
  Search,
  Plus,
  Moon,
  MessageSquare,
  Phone,
  ChevronDown,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { handleUnsupportedMethod } from '@/atoms/Toasts';
import { toastVariants } from '@/atoms/Toasts';
import { useToggleDarkMode } from '@/lib/useDarkMode';
import { motion, AnimatePresence } from 'framer-motion';
import { ChangeLightMode } from '@/molecules/ChangeLightMode';

// Mock data for accounts - replace with your actual data structure
const accounts = [{ id: 1, name: 'Personal account', isActive: true }];

export function AppHeader() {
  const { isDarkMode, toggle } = useToggleDarkMode();

  return (
    <header className="h-16 border-b px-4 flex items-center gap-4">
      <div className="flex items-center gap-2 min-w-60">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:text-foreground">
            <span className="text-muted-foreground">Personal account</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                className={`flex items-center gap-2 ${
                  account.isActive ? 'bg-accent' : ''
                }`}>
                <span>{account.name}</span>
                {account.isActive && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    Active
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div
                onClick={() => {
                  handleUnsupportedMethod(
                    toastVariants.handleUnsupportedMethod('Add new account')
                  );
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4" />
                <span>Add new account</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="font-medium">Dashboard</span>
      </div>
      <div className="flex-1 flex items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ChangeLightMode />
        <Button variant="ghost" size="icon">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
