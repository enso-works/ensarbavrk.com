'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { EnsoAnimatedButton } from '@/organisms/EnsoAnimatedButton';
import { Shield } from 'lucide-react';
import classNames from 'classnames';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(6, {
    message: 'Phone number must be at least 6 characters.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: 'Michal',
  email: 'michal@example.com',
  phone: '11 99 22 33',
};

interface ProfileFormProps {
  onSecurityClick: () => void;
  isSecurityCardOpen: boolean;
}

export function ProfileForm({
  onSecurityClick,
  isSecurityCardOpen,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsEditing(false);
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  console.log(
    isSecurityCardOpen,
    'isSecurityCardOpen ',
    classNames('flex flex-col', isSecurityCardOpen ? 'flex-1' : 'flex-[0.5]')
  );

  return (
    <Card
      className={classNames('flex flex-col', isSecurityCardOpen ? 'flex-1' : 'flex-[0.5]')}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="mb-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src="/images/assets/static.png"
              alt="Profile picture"
            />
            <AvatarFallback>E.B</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col flex-1">
          <Form {...form}>
            <form
              id="profileForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {isEditing ? (
            <EnsoAnimatedButton
              type="submit"
              form="profileForm"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="w-full"
              isLoading={form.formState.isSubmitting}
              loadingText="Saving changes">
              Save changes
            </EnsoAnimatedButton>
          ) : (
            <>
              <Button
                variant="default"
                className="w-full"
                type="button"
                onClick={() => setIsEditing(true)}>
                Edit profile
              </Button>
              <Button
                variant="outline"
                className="w-full flex gap-2"
                type="button"
                onClick={onSecurityClick}>
                <Shield className="h-4 w-4" />
                Security Settings
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
