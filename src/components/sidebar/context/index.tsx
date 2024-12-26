import { createContext, useState } from "react";

export type SidebarContextType =  {
    expanded: boolean;
    open: ()=> void;
    close: ()=> void;
  };

export const SidebarContext = createContext<SidebarContextType|null>(null);

export const SidebarProvider:React.FC<{ children: React.ReactNode }> =  ({ children })=> {
   const [expand, setExpand] = useState(false);

   const value= {
    expanded: expand,
    open: () => setExpand(true),
    close: () => setExpand(false),
   }
   return(
    <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>
   );
}
