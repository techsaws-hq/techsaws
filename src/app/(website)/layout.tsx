import { NotchHeader } from "@/components/layouts/header";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <NotchHeader />
    {children}
    </>
          
  );
}
