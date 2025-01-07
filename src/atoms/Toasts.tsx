import { toast } from 'react-hot-toast';

export const toastVariants = {
  handleUnsupportedMethod: (method?: string) => ({
    title: 'Coming Soon!',
    description: `Sign in with ${method} will be available soon.`,
  }),
};

export const handleUnsupportedMethod = (variant: {
  title: string;
  description: string;
}) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-[--color-bg-primary] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-[--color-text-primary]">
              {variant.title}
            </p>
            <p className="mt-1 text-sm text-[--color-text-secondary]">
              {variant.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-[--color-text-secondary]/10">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-accent]/70 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  ));
};
