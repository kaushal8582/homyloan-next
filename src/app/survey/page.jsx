import { Suspense } from "react";
import Page from "@/pages/SurveyForm";

export default function RoutePage() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
