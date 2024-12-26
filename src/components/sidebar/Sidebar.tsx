import React from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { useSidebarContext } from './hooks/useSidebarContext';

const Sidebar = ({
    children,
}: {
    children: React.ReactNode,
}) => {
  const { expanded, close, open } = useSidebarContext();

  const toggleSidebar = (): void => {
     if(expanded) close();
     else open();
  };

  return (
   <nav className="w-full sm:h-full flex sm:flex-col bg-gray-50 dark:bg-slate-800 border-r border-slate-900 shadow-sm justify-center items-center"> 
        <div className='p-4 pb-2 flex self-end'>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hidden md:flex " >
              {expanded ? <ArrowLeftCircleIcon className="size-8 font-medium text-white" /> : <ArrowRightCircleIcon className="size-8 font-medium text-white"/>}
          </button>
        </div>
        <ul className="flex gap-4 md:gap-2  md:flex-col md:flex-1 p-4 space-y-2 items-center">
          {children}
        </ul>
      </nav>
  );
};

export default Sidebar;
