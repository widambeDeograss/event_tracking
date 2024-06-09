import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { AuthProvider } from "@/context";

//components
import TransitionWrapper from "../transition-wrapper";
const inter = Sora({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "EventTracking System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    
      <section className={`${inter.className} text-white bg-[#6476F3]`}>
       <AuthProvider>
       <TransitionWrapper>
              <>
                <div className="ml-5 mr-5 xl:ml-20 xl:mr-32">
                  {children}
                </div>
              </>
        
        </TransitionWrapper>
       </AuthProvider>
      </section>
 
  );
}