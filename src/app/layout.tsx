import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import RegisterSw from "../componentes/app";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clima Tempo",
  description: "Consulte o clima atual da sua cidade.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={openSans.variable}>
      <body>
        <RegisterSw />
        {children}
      </body>
    </html>
  );
}
