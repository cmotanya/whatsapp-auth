import "./globals.css";
import { grotesk, sora } from "@/utils/font";
import { siteMetadata } from "@/data/metadata";
import { AppToaster } from "@/utils/toast";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${sora.variable} antialiased`}>
        <AppToaster />
        {children}
      </body>
    </html>
  );
}
