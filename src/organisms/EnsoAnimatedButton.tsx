import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonProps } from "@/components/ui/button";

interface EnsoAnimatedButtonProps extends ButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function EnsoAnimatedButton({
  isLoading,
  loadingText = "Loading",
  children,
  ...props
}: EnsoAnimatedButtonProps) {
  return (
    <Button {...props} disabled={isLoading}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
} 