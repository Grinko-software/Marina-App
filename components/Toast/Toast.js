import { Toaster } from 'react-hot-toast'

const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{
                // Ensure toasts are above other elements on mobile
                zIndex: 9999
            }}
            className={
                ' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'
            }
            toastOptions={{
                className: '',
                duration: 2000,
                // Enable touch/swipe gestures on mobile
                style: {
                    touchAction: 'pan-y',
                    cursor: 'pointer'
                },
                // Make toasts dismissible on click/touch
                onClick: (toast) => {
                    // Toast will auto-dismiss on click
                },
                success: {
                    duration: 2000,
                    theme: {
                        primary: 'green',
                        secondary: 'black'
                    }
                }
            }}
        />
    )
}

export default Toast
