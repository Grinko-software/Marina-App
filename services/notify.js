import { toast } from 'react-hot-toast'

/**
 * Display a toast notification
 * @param {string} text - Message to display
 * @param {object} options - Toast options (duration, icon, etc)
 * @returns {string} Toast ID
 */
export const notify = (text, options = {}) => {
    return toast(text, {
        duration: 2000, // Default 2 seconds for mobile performance
        ...options
    })
}
