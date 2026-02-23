 "use client";
 import { usePathname } from "next/navigation";
 import Header from "./Header";
 import Footer from "./Footer";
 import { SelectionProvider } from "../context/SelectionContext";
 
 export default function AppChrome({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();
   const hideChrome = pathname?.startsWith("/studio");
   if (hideChrome)
     return (
       <SelectionProvider>
         {children}
       </SelectionProvider>
     );
   return (
    <SelectionProvider>
      <Header />
      {children}
      <Footer />
    </SelectionProvider>
   );
 }
