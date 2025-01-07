import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/AuthContext';
import { AccountOverview } from '@/organisms/AccountOverview';
import { ExpensesChart } from '@/organisms/ExpensesChart';
import { ProfileForm } from '@/organisms/ProfileForm';
import { SecurityForm } from '@/organisms/SecurityForm';
import { TransactionList } from '@/organisms/TransactionList';
import { UpcomingExpense } from '@/organisms/UpcomingExpense';
import { PrivateRoute } from '@/templates/PrivateRoute';
import { Pencil, Shield } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut } = useAuth();

  const [isSecurityCardOpen, setIsSecurityCardOpen] = useState(
    searchParams.has('security')
  );

  const toggleSecurityCard = (open: boolean) => {
    setIsSecurityCardOpen(open);

    const newSearchParams = new URLSearchParams(searchParams);

    if (open) {
      newSearchParams.set('security', '');
    } else {
      newSearchParams.delete('security');
    }

    router.replace(
      `/app/profile${
        newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''
      }`
    );
  };

  return (
    <PrivateRoute>
      <div className="space-y-6 p-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-1 flex-row gap-6 w-full">
          <div className="w-1/2">
            <ProfileForm
              onSecurityClick={() => toggleSecurityCard(true)}
              isSecurityCardOpen={isSecurityCardOpen}
            />
          </div>
          <AnimatePresence>
            {isSecurityCardOpen && (
              <SecurityForm onClose={() => toggleSecurityCard(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PrivateRoute>
  );
}
