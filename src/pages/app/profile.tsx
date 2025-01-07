import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/AuthContext';
import { ProfileForm } from '@/organisms/ProfileForm';
import { SecurityForm } from '@/organisms/SecurityForm';
import { PrivateRoute } from '@/templates/PrivateRoute';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
      newSearchParams.set('security', 'true');
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
      <div className="space-y-6 p-4 sm:p-6 max-w-[80rem]">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-1 flex-col md:flex-row  gap-6 w-full">
          <ProfileForm
            onSecurityClick={() => toggleSecurityCard(true)}
            isSecurityCardOpen={isSecurityCardOpen}
          />
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
