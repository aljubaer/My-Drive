import { Inter } from "next/font/google";
import "./globals.css";

import StyledComponentsRegistry from "@/lib/registry";
import SideNav from "./components/Sidenav";
import styled from "styled-components";
import FileContextProvider from "./contexts/FilesContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <FileContextProvider>
            <SideNav />
            {children}
          </FileContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
