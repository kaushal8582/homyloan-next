"use client";
import Page from "@/pages/BlogPost";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  return <Page params={params} />;
}
