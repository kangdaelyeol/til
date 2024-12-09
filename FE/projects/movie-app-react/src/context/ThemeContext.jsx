import { createContext, useState } from 'react'

export const ThemeContext = createContext({
    theme: 'light',
    changeTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const changeTheme = () => {
        setTheme((pre) => (pre === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
