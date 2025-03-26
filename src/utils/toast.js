import { toast } from 'react-hot-toast';

/**
 * Show a success toast message
 * @param {string} message - The message to display
 * @returns {string} Toast ID
 */
export const showSuccessToast = (message) => {
  return toast.success(message, {
    duration: 5000,
    position: 'top-right',
  });
};

/**
 * Show an error toast message
 * @param {string} message - The message to display
 * @returns {string} Toast ID
 */
export const showErrorToast = (message) => {
  return toast.error(message, {
    duration: 5000,
    position: 'top-right',
  });
};

/**
 * Show a loading toast message
 * @param {string} message - The message to display
 * @returns {string} Toast ID
 */
export const showLoadingToast = (message) => {
  return toast.loading(message, {
    position: 'top-right',
  });
};

/**
 * Update an existing toast
 * @param {string} toastId - The ID of the toast to update
 * @param {Object} options - Toast options
 */
export const updateToast = (toastId, options) => {
  toast.dismiss(toastId);
  
  if (options.type === 'success') {
    toast.success(options.render, {
      id: toastId,
      duration: options.autoClose || 5000,
      position: 'top-right',
    });
  } else if (options.type === 'error') {
    toast.error(options.render, {
      id: toastId,
      duration: options.autoClose || 5000,
      position: 'top-right',
    });
  }
};