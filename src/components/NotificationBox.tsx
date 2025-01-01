import { CheckIcon } from "@heroicons/react/24/solid";

const NotificationBox = ({notificationList, markAsSeen, clearAll}) => {

  return (
    <div className="absolute top-12 right-5 bg-white dark:bg-slate-800 dark:bg-opacity-95 border border-gray-900 shadow-lg rounded-lg w-fit min-w-64">
      <div className="p-4">
        <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-md font-bold ">Notifications</h3>
            <button
            className="text-red-500 text-center"
            onClick={clearAll}
            >
            Clear All
            </button>
        </div>
        {notificationList.length === 0 ? (
          <p className="">No notifications</p>
        ) : (
          <ul>
            {notificationList.map((notif) => (
              <li key={notif.id} className={`flex justify-between items-center gap-4 p-2 border-b border-l-4 ${notif.isUrgent ? 'border-l-red-600' : 'border-l-yellow-600'}  my-2`}>
                <span>{notif.message}</span>
                {!notif.seen && (
                  <button
                    className="text-blue-500"
                    onClick={() => markAsSeen(notif.id)}
                  >
                    <CheckIcon className="size-6 font-medium text-violet-700"/>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default NotificationBox;