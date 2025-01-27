import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { EnsoAnimatedButton } from '@/organisms/EnsoAnimatedButton';
import { Textarea } from '@/components/ui/textarea';
import { publicClient } from '@/lib/supabaseClient';
import { commentService } from '@/services/commentService';

interface CommunityCommentProps {
  slug: string;
}

export function CommunityComment({ slug }: CommunityCommentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { signIn, signUp, user } = useAuth();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      await signIn(email, password);
      toast.success('Logged in successfully!');
      setShowLoginForm(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }

      await signUp(email, password);
      toast.success(
        'Registration successful! Please check your email to verify your account.'
      );
      setShowRegisterForm(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCommentSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await commentService.createComment(comment, slug, user.id);
      setComments(prevComments => [data, ...prevComments]);
      setComment('');
      toast.success('Comment posted successfully!');
    } catch (error: any) {
      console.log('ERROR ', error);
      toast.error('Failed to post comment');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
    const channel = commentService.subscribeToComments(slug, fetchComments);
    return () => {
      publicClient.removeChannel(channel);
    };
  }, [slug]);

  const fetchComments = async () => {
    try {
      const data = await commentService.fetchComments(slug);
      setComments(data || []);
    } catch (error: any) {
      console.log('HERE IS THE ERROR ', error);
      toast.error('Failed to fetch comments');
    }
  };

  // Update the display section
  <span className="font-medium">
    {comment?.profiles?.username?.split('@')[0]}
  </span>

  if (user) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{user ? 'Comments' : 'Join the Conversation'}</h3>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {comment?.profiles?.username?.split('@')[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your comment</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                required
                disabled={isLoading}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <EnsoAnimatedButton
                type="submit"
                isLoading={isLoading}
                loadingText="Posting...">
                Post Comment
              </EnsoAnimatedButton>
            </div>
          </form>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Stay Updated and Join the Conversation
        </h3>
        <p className="text-sm text-muted-foreground">
          Log in or register to receive updates and unlock the ability to comment
          on posts.
        </p>

        {!showLoginForm && !showRegisterForm && (
          <div className="flex space-x-4">
            <Button variant="default" onClick={() => setShowLoginForm(true)}>
              Log in
            </Button>
            <Button variant="outline" onClick={() => setShowRegisterForm(true)}>
              Register
            </Button>
          </div>
        )}

        <AnimatePresence>
          {showLoginForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoading}
                    className="transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <EnsoAnimatedButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Logging in...">
                    Log in
                  </EnsoAnimatedButton>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowLoginForm(false);
                        setShowRegisterForm(true);
                      }}>
                      Create an account
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowLoginForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {showRegisterForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={isLoading}
                    className="transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <EnsoAnimatedButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Creating account...">
                    Register
                  </EnsoAnimatedButton>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowRegisterForm(false);
                      setShowLoginForm(true);
                    }}>
                    Already have an account?
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-muted-foreground">
          By logging in or registering, you agree to our terms and privacy policy.
        </p>
      </div>
    </Card>
  );
}
