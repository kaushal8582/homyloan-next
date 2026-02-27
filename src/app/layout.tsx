import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "HomyLoan - Your Trusted Mortgage Partner",
  description: "HomyLoan offers comprehensive mortgage solutions including purchase loans, refinancing, VA loans, FHA loans, and more. Get expert guidance for your home financing needs.",
  keywords: "mortgage, home loans, refinance, VA loans, FHA loans, mortgage calculator, home financing",
  openGraph: {
    title: "HomyLoan - Your Trusted Mortgage Partner",
    description: "HomyLoan offers comprehensive mortgage solutions including purchase loans, refinancing, VA loans, FHA loans, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto">
        <ScrollToTop />
          {children}
      </body>
    </html>
  );
}
