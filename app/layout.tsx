import "./globals.css";
import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import getSongsByUserId from '@/actions/getSongsByUserId'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Music Catalog",
    description: "Search for some music?",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const products = await getActiveProductsWithPrices();
    const userSongs = await getSongsByUserId();
    return (
        <html lang="en">
            <body className={font.className}>
                <SupabaseProvider>
                    <UserProvider>
                      <ModalProvider products={products}/>
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
