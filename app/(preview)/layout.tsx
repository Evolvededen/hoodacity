import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodacity-multibots.vercel.app"),
  title: "HoodaCity Multibots - AI-Powered Dashboards & Generators",
  description: "Manage HR, Intake, Onboarding, and Front Desk with AI agents and content generators",
  openGraph: {
    title: "HoodaCity Multibots",
    description: "AI-powered business management system",
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
      <body>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
