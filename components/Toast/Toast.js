import { Toaster } from 'react-hot-toast'
const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            className={
                ' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'
            }
            toastOptions={{
                className: '',
                duration: 10000,
                success: {
                    duration: 3000,
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
