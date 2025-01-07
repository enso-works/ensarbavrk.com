import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { AccountOverview } from '@/organisms/AccountOverview';
import { ExpensesChart } from '@/organisms/ExpensesChart';
import { TransactionList } from '@/organisms/TransactionList';
import { UpcomingExpense } from '@/organisms/UpcomingExpense';
import { PrivateRoute } from '@/templates/PrivateRoute';
import { Pencil } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <PrivateRoute>
      <div className="flex justify-center flex-1 gap-6 p-6">
        <div className="flex-1 max-w-[80rem] space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">
              Good morning, {user?.email}
            </h1>
            <Button variant="ghost" className="gap-2">
              <Pencil className="w-4 h-4" />
              Customize
            </Button>
          </div>
          <AccountOverview />
          <TransactionList />
        </div>
        <div className="w-80 space-y-6">
          <UpcomingExpense />
          <ExpensesChart />
        </div>
      </div>
    </PrivateRoute>
  );
}
