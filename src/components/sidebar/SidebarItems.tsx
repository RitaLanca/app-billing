import { NavLink } from "react-router-dom";
import { useSidebarContext } from "./hooks/useSidebarContext";


interface SidebarProps {
    icon: React.ElementType,
    text: string,
    path: string,   
}

const SidebarItem = ({ icon:Icon, text, path}: SidebarProps ) => {
    const { expanded } = useSidebarContext();
    


    return (
    <li className="group">
        <NavLink
            to={path}
            className={({isActive}) => `
            relative flex items-center py-2 px-4 my-1 
            font-medium rounded-md cursor-pointer transition-colors
            ${
                isActive 
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100  text-indigo-800 dark:from-slate-700 dark:to-slate-600 dark:text-white"
                : `hover:bg-indigo-50 text-gray-600 
                    dark: hover:bg-inherit dark:hover:bg-gradient-to-tr dark:hover:from-slate-700 dark:hover:to-slate-600 dark:text-white`
            }`}
        >
            <Icon className="size-6 text-white" />
            <span className={`overflow-hidden transition-all ${expanded ? "w-0 md:w-52 md:mx-4" : "w-0"}`}>{text}</span>
      
        {!expanded && (
            <div 
                className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm 
                    invisible opacity-20 -translate-x-3 transition-all
                    md:group-hover:visible md:group-hover:opacity-100 md:group-hover:translate-x-0
                `}>
                {text}
            </div>
        )}
          </NavLink>
      </li>
    );
}

export default SidebarItem;
