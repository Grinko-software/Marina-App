'use client'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()
    return (
        <section>
            The current theme is :{theme}
            <button onClick={ () => setTheme('light') }>Light Mode</button>
            <button onClick={ () => setTheme('Dark') }>Dark Mode</button>
        </section>
    )
}
export default ThemeSwitcher
