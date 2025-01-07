import Link from "next/link"
import { Home, BarChart2, Zap, Mail, FolderClosed, Grid, Settings, HelpCircle } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-[60px] border-r bg-background flex flex-col items-center py-4 gap-4">
      <div className="w-10 h-10 bg-rose-100 rounded-full" />
      <nav className="flex flex-col gap-4 items-center flex-1">
        <Link href="/" className="p-2 rounded-lg bg-primary/5 text-primary">
          <Home className="w-5 h-5" />
        </Link>
        <Link href="/transactions" className="p-2 rounded-lg hover:bg-muted">
          <BarChart2 className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/payments" className="p-2 rounded-lg hover:bg-muted">
          <Zap className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/messages" className="p-2 rounded-lg hover:bg-muted">
          <Mail className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/documents" className="p-2 rounded-lg hover:bg-muted">
          <FolderClosed className="w-5 h-5 text-muted-foreground" />
        </Link>
        <Link href="/apps" className="p-2 rounded-lg hover:bg-muted">
          <Grid className="w-5 h-5 text-muted-foreground" />
        </Link>
      </nav>
      <div className="flex flex-col gap-4 items-center">
        <button className="p-2 rounded-lg hover:bg-muted">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </aside>
  )
}

