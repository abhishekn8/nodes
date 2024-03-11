import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Providers from "./providers";


const inter = Inter({ subsets: ["latin"] });

const Header = dynamic(() => import('@/components/Layout/header'), { ssr: true });


interface AdminLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
