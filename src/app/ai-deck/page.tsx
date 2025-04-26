import { Suspense } from "react";
import AiDeckPageContent from "./AiDeckPageContent";

export default function AiDeckPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <AiDeckPageContent />
    </Suspense>
  );
} 