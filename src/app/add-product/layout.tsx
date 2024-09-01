import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | BleepKart",
  description: "We help make your wallet lighter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}