import { useContext } from "react";
import { SidebarContext, SidebarContextType } from "../context";


export const useSidebarContext = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
      throw new Error("useSidebarContext must be used within a SidebarProvider");
    }
    return context;
  };
  