import { Inter } from "next/font/google";
import "./globals.css";

import StyledComponentsRegistry from "@/lib/registry";
import SideNav from "./components/Sidenav";
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
            <div style={{ display: "flex", maxWidth: "100wh", minHeight: "100vh" }}>
              <SideNav />
              {children}
            </div>
          </FileContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
