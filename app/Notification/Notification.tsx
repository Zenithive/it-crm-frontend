// LeadNotifications.tsx
import React, { useEffect, useState } from "react";
import PubSub from "../pubsub/Pubsub";


type NotificationProps = {
  duration?: number; // Duration in milliseconds
};

type Notification = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  createdAt: number;
};

const LeadNotifications: React.FC<NotificationProps> = ({ duration = 5000 }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to lead update events
    const successSub = PubSub.subscribe("LEAD_UPDATE_SUCCESS", (data) => {
      const { leadName, fromStage, toStage,component } = data;
      let message="";


      if (component === "addlead") {
        message = `"${leadName}" updated successfully !`;
      }  else {
        // Default message
        message = `"${leadName}" moved from ${fromStage || " "} to ${toStage || " "} successfully!`;
      }
      addNotification({
        type: "success",
        message,
      });
    });

    const errorSub = PubSub.subscribe("LEAD_UPDATE_ERROR", (data) => {
      const { leadId, fromStage, toStage, error } = data;
      addNotification({
        type: "error",
        message: `Failed to move lead (${leadId}) from ${fromStage} to ${toStage}: ${error}`,
      });
    });

    const leadAdd = PubSub.subscribe("LEAD_ADD_SUCCESS", (data) => {
      const { leadName } = data;
      addNotification({
        type: "success",
        message: `"${leadName}" added successfully!`,
      });
    });
    const leadAddError = PubSub.subscribe("LEAD_ADD_ERROR", (data) => {
      const { leadName} = data;
      addNotification({
        type: "error",
        message: `Failed to add ${leadName}!`,
      });
    });


    const resourceAdd = PubSub.subscribe("RESOURCE_ADD_SUCCESS", (data) => {
      const { resourceName } = data;
      addNotification({
        type: "success",
        message: `"${resourceName}" added successfully!`,
      });
    });

    const resourceUpdate = PubSub.subscribe("RESOURCE_ADD_SUCCESS", (data) => {
      const { resourceName } = data;
      addNotification({
        type: "success",
        message: `"${resourceName}" updated successfully!`,
      });
    });
    const resourceAddError = PubSub.subscribe("RESOURCE_ADD_ERROR", (data) => {
      const { resourceName} = data;
      addNotification({
        type: "error",
        message: `Failed to add ${resourceName}!`,
      });
    });




    
    const vendorAdd = PubSub.subscribe("VENDOR_ADD_SUCCESS", (data) => {
      const { vendorName } = data;
      addNotification({
        type: "success",
        message: `"${vendorName}" added successfully!`,
      });
    });

    const vendorUpdate = PubSub.subscribe("VENDOR_UPDATE_SUCCESS", (data) => {
      const { vendorName } = data;
      addNotification({
        type: "success",
        message: `"${vendorName}" updated successfully!`,
      });
    });
    const vendorAddError = PubSub.subscribe("VENDOR_ADD_ERROR", (data) => {
      const { vendorName} = data;
      addNotification({
        type: "error",
        message: `Failed to add ${vendorName}!`,
      });
    });

    const vendorUpdateError = PubSub.subscribe("VENDOR_UPDATE_ERROR", (data) => {
      const { vendorName} = data;
      addNotification({
        type: "error",
        message: `Failed to update ${vendorName}!`,
      });
    });



    const overallCasestudyAdd = PubSub.subscribe("CASESTUDY_ADD_SUCCESS", (data) => {
      const { casestudyName,component } = data;
      let message="";
      if(component==="casestudy"){
        message = `"caseStudy added successfully !`; 
      }
      addNotification({
        type: "success",
        message,
      });
    });

    const overallCasestudyUpdate = PubSub.subscribe("CASESTUDY_UPDATE_SUCCESS", (data) => {
      const { casestudyName } = data;
      addNotification({
        type: "success",
        message: `"${casestudyName}" updated successfully!`,
      });
    });
    // Cleanup subscriptions
    return () => {
      successSub();
      errorSub();
      leadAdd();
      leadAddError();
      resourceAdd();
      resourceUpdate();
      overallCasestudyAdd();
      overallCasestudyUpdate();
      resourceAddError();
      vendorAdd();
      vendorUpdate();
      vendorAddError();
      vendorUpdateError();
     
    };
  }, []);

  // Auto-remove notifications after duration
  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setTimeout(() => {
      setNotifications((prev) => {
        const now = Date.now();
        return prev.filter((n) => now - n.createdAt < duration);
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [notifications, duration]);

  const addNotification = ({ type, message }: { type: "success" | "error" | "info"; message: string }) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        message,
        createdAt: Date.now(),
      },
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-lg shadow-lg p-4 flex items-start transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 border-l-4 border-green-500"
              : notification.type === "error"
              ? "bg-red-100 border-l-4 border-red-500"
              : "bg-blue-100 border-l-4 border-blue-500"
          }`}
        >
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              notification.type === "success"
                ? "text-green-800"
                : notification.type === "error"
                ? "text-red-800"
                : "text-blue-800"
            }`}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default LeadNotifications;


