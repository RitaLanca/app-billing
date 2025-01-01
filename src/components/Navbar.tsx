
import { useNotificationContext } from "@/hooks/useNotificationContext";
import {  BellAlertIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import NotificationBox from "./NotificationBox";
import useDeadlineNotifications from "@/hooks/useDeadlineNotifications";

const Navbar = () => {
    const [openNotificationBox, setOpenNotificationBox] = useState(false);
    const { refreshNotifications} = useDeadlineNotifications();
    const { notifications, markAsSeen, clearNotifications } = useNotificationContext();
    const unseenNotif = notifications.filter((notif) => !notif.seen);
    
    useEffect(()=> {
        refreshNotifications();
    },[]);

    return (
    <div className="w-screen h-12 dark:bg-slate-800 shadow-xl p-4 flex items-center mx-auto">
        <div className="w-56 md:w-64">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                TechBilling
            </span>
        </div>
       <div className="flex flex-1 justify-end pr-4 relative">
           <button onClick={() => {setOpenNotificationBox(prevState => !prevState)}} >
                <BellAlertIcon className="size-4 text-white"/>
                {unseenNotif.length > 0 && (
                    <span className="absolute -top-3 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {unseenNotif.length}
                    </span>
                )}
            </button>
        </div> 
       { openNotificationBox && (
            <div className="z-30">
                <NotificationBox notificationList={unseenNotif} markAsSeen={markAsSeen} clearAll={clearNotifications}/>
            </div>
        )}
    </div>);
}

export default Navbar;