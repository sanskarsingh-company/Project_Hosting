import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

// Create Notification Context
const NotificationContext = createContext();

// Custom hook to use notification
export const useNotification = () => {
  return useContext(NotificationContext);
};

// NotificationProvider component to wrap the app
export const NotificationProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: 'top-right',
    });
  };

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}
    </NotificationContext.Provider>
  );
};
