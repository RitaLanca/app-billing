import { useCallback, useEffect } from "react";
import useRequest from "./useRequest";
import { getComplianceRequirements } from "@/api/requirements";
import { useNotificationContext } from "./useNotificationContext";
import { requirementProps } from "@/types/requirements";

const useDeadlineNotifications = () => {
    const { addNotification, notifications, clearNotifications} = useNotificationContext();

    const {data:requirements, request: refreshRequirements} = useRequest(getComplianceRequirements,  { disabled: true });
    
    const deadlineMessage = (diffInDays: number, requirementName: string) => {
        if (diffInDays <=5 && diffInDays > 0) {
            return `Urgent: Deadline for "${requirementName}" is in ${Math.ceil(diffInDays)} days!`;
        } else if (diffInDays > 3 && diffInDays <= 15) {
            return `Reminder: Deadline for "${requirementName}" is in ${Math.ceil(diffInDays)} days.`;
        }
        return undefined;
    }

    const createNotifications = useCallback(() => {
        const today = new Date();
        const notifications = requirements?.filter(req => !req.done);

        notifications?.forEach((requirement: requirementProps) => {
            const targetDate = new Date(requirement.deadline);
            const diffInDays = (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
            
            const message = deadlineMessage(diffInDays, requirement.name);
            console.log('message', message);
            if (message) {
                const notif = {
                    id: requirement.id,
                    message,
                    seen: false,
                    isUrgent: diffInDays >= 0 && diffInDays <=5,
                }
                addNotification(notif);
            }
     });
    }, [addNotification, requirements]);

    const refreshNotifications = useCallback(() => {
        refreshRequirements();
        clearNotifications();
        createNotifications();
      }, [refreshRequirements, createNotifications]);
    

    useEffect(() => {
        if(requirements){
            clearNotifications();
            createNotifications()
        };
  }, [requirements]);

  return { refreshNotifications, notifications };
};

export default useDeadlineNotifications;