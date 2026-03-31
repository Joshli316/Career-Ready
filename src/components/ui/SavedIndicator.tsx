import { CheckCircle } from "lucide-react";

interface SavedIndicatorProps {
  visible: boolean;
}

export function SavedIndicator({ visible }: SavedIndicatorProps) {
  return (
    <div aria-live="polite" aria-atomic="true" className="flex items-center gap-1.5 text-sm text-success">
      {visible && (
        <>
          <CheckCircle className="h-4 w-4" />
          Saved
        </>
      )}
    </div>
  );
}
