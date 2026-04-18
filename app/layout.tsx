import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodacity.vercel.dev"),
  title: "Hoodacity - Your AI Command Center",
  description: "Your AI command center for managing everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background">
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
