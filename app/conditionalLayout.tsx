"use client";

import { usePathname } from "next/navigation";
import ClientProviders from "./provider";

// import Header from "./components/header";
// import Footer from "./components/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutPages = [
    "/forgot-password",
    "/reset-password",
    "/login",
    "/register",
  ];

  if (noLayoutPages.includes(pathname)) {
    return <ClientProviders>{children}</ClientProviders>;
  }

  return (
    <ClientProviders>
      {/* <Header /> */}
      <main className="flex-grow">{children}</main>
      {/* <Footer /> */}
    </ClientProviders>
  );
}
