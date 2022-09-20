import { createContext, useState } from "react"


export const UserContext = createContext()
export const ProfPicContext = createContext()

export default function Context({ children }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    console.log(user)


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
