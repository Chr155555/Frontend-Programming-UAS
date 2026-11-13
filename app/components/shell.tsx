"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import Footer from "./footer";

const STANDALONE_PAGES = ["/auth"];

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (STANDALONE_PAGES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

