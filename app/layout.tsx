import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchProvider } from "@/components/search/search-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio de Mehdi Zeroual",
    template: "%s | Portfolio de Mehdi Zeroual",
  },
  description:
    "Découvrez le parcours de Mehdi Zeroual à travers ses projets, études, certifications et expériences professionnelles.",
  keywords: [
    "portfolio",
    "projets",
    "blog",
    "entrepreneuriat",
    "développeur",
    "Mehdi Zeroual",
  ],
  authors: [{ name: "Mehdi Zeroual" }],
  creator: "Mehdi Zeroual",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mehdislife.com",
    title: "Portfolio de Mehdi Zeroual",
    description:
      "Découvrez le parcours de Mehdi Zeroual à travers ses projets, études, certifications et expériences professionnelles.",
    siteName: "Portfolio de Mehdi Zeroual",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio de Mehdi Zeroual",
    description:
      "Découvrez le parcours de Mehdi Zeroual à travers ses projets, études, certifications et expériences professionnelles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SearchProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
