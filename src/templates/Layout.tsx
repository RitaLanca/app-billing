import { Outlet } from 'react-router-dom';
import {Sidebar, SidebarItems, menuItems} from '../components/sidebar';
import Navbar from '../components/Navbar';
import { SidebarProvider } from "../components/sidebar/context";

const Layout = () => {
  return (
    <div className="flex w-screen sm:w-full h-full min-h-screen text-gray-100 overflow-hidden">
        <div className='fixed inset-0 z-0 bg-gray-900'>
            <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
            <div className='absolute inset-0 backdrop-blur-sm'/>
        </div>
        <div className='z-10'>
            <Navbar/>
            <div className='flex flex-col md:flex-row min-h-full'>
                <aside
                    className="mt-1 z-20 bg-gray-50 dark:bg-slate-800 border-r border-slate-900"
                    aria-label="Sidebar"
                    >
                    <SidebarProvider>
                        <Sidebar>
                            {menuItems.map(item => (
                                <SidebarItems 
                                    key={item.text} 
                                    text={item.text} 
                                    icon={item.icon} 
                                    path={item.path}
                                    />
                            ))}
                        </Sidebar>
                    </SidebarProvider>
                </aside>
                <main className='flex-1 overflow-auto m-1'>
                    <Outlet /> 
                </main>
            </div>
        </div>
    </div >
  )
}

export default Layout;