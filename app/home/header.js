import UserAvatar from '@/components/ui/UserAvatar'
export function Header () {
    return (
        <header className={'sticky z-20 bg-primary-300 dark:bg-secondary-500 flex  flex-row-reverse mt-[1rem] mx-[1.5rem] '}>
            <div className="flex-1 flex flex-col sm:flex-row">
                <UserAvatar/>
            </div>
        </header>
    )
}
