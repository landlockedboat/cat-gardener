import { Link } from "@heroui/link";
import { Navbar } from "@/components/navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/landlockedboat"
          title="landlockedboat's profile on GitHub"
        >
          <span>For educational purposes only</span>
          <span>-</span>
          <span className="text-default-600">Created by</span>
          <span className="text-primary">landlockedboat</span>
          
        </Link>
      </footer>
      <GoogleAnalytics gaId="G-RB80ZKERRF" />
    </div>
  );
}
