import LayoutCondition from "@/layout/LayoutCondition";
import { NotificationProvider } from "@/layout/NotificationProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rubikFont = localFont({
    src: [{ path: "../../public/fonts/Rubik/Rubik-variable.ttf" }],
    variable: "--font-rubik",
});

export const metadata: Metadata = {
    title: {
        template: "%s | هنرینو",
        default: "هنرینو | صفحه اصلی",
    },
    description: "new Project",
};

//hello world

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
            <body className={`${rubikFont.variable} antialiased bg-stone-100`}>
                <NotificationProvider>
                    <LayoutCondition>{children}</LayoutCondition>
                </NotificationProvider>
            </body>
        </html>
    );
}
