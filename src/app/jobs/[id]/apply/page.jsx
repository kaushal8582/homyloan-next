"use client";
import Page from "@/pages/JobApplicationForm";
import { useParams } from "next/navigation";

export default function JobApplyPage() {
  const params = useParams();
  return <Page params={params} />;
}
