import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "WhatsApp Authenticator",
  description:
    "A secure WhatsApp authentication app built with Next.js and TypeScript.",
  keywords: ["WhatsApp", "Authenticator", "Next.js", "TypeScript", "Security"],
  authors: [
    { name: "Cornelius Motanya", url: "https://whatsapp-auth.vercel.app" },
  ],
  openGraph: {
    title: "WhatsApp Authenticator",
    description:
      "A secure WhatsApp authentication app built with Next.js and TypeScript.",
    url: "https://whatsapp-auth.vercel.app",
    siteName: "WhatsApp Authenticator",
    locale: "en_US",
    type: "website",
  },
};
