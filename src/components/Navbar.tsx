
import {  BellAlertIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
    return (
    <div className="w-screen h-12 dark:bg-slate-800 shadow-xl p-4 flex items-center mx-auto">
        <div className="w-56 md:w-64">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                TechBilling
            </span>
        </div>
       <div className="flex flex-1 justify-end pr-4">
           <button >
                <BellAlertIcon className="size-4 text-white"/>
            </button>
        </div> 
    </div>);
}

export default Navbar;