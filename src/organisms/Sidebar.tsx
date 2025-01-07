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
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const router = useRouter();

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
        <button className="p-2 rounded-lg hover:bg-muted">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
