"use client";
import Page from "@/pages/PressPost";
import { useParams } from "next/navigation";

export default function PressPostPage() {
  const params = useParams();
  return <Page params={params} />;
}
