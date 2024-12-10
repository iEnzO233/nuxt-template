/**
 * Show a toast notification.
 * @param {string} color - The toast type ('success', 'error', etc.).
 * @param {string} message - The message to display in the toast.
 */
export function showToast(color, message) {
    const toast = useToast();
    toast.add({
        title: message,
        color: color,
        timeout: 5000, // Optional: Control toast duration
    });
}