"use client";
import Page from "@/pages/JobPost";
import { useParams } from "next/navigation";

export default function JobPostPage() {
  const params = useParams();
  return <Page params={params} />;
}
