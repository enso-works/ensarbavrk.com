import Link from 'next/link';
import {
  Home,
  BarChart2,
  Zap,
  MessageSquare,
  FolderClosed,
  Grid,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Sidebar() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <aside className="w-[60px] border-r bg-background flex flex-col items-center py-4 gap-4">
      <Avatar onClick={() => router.push('/app/profile')} className="h-10 w-10">
        <AvatarImage src="/images/assets/static.png" alt="Profile picture" />
        <AvatarFallback>EB</AvatarFallback>
      </Avatar>
      <nav className="flex flex-col gap-4 items-center flex-1">
        <Link href="/app/dashboard" className="p-2 rounded-lg bg-primary/5 text-primary">
          <Home className="w-5 h-5" />
        </Link>
        <Link href="/app/transactions" className="p-2 rounded-lg hover:bg-muted">
          <BarChart2 className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/app/payments" className="p-2 rounded-lg hover:bg-muted">
          <Zap className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/app/messages" className="p-2 rounded-lg hover:bg-muted">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </Link>
      </nav>
      <div className="flex flex-col gap-4 items-center">
        <button className="p-2 rounded-lg hover:bg-muted">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-muted">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuItem onClick={() => router.push('/app/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
