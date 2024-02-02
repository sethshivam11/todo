import React, { Dispatch, SetStateAction } from "react"

interface UserContext {
    user: UserInterface,
    setUser: Dispatch<SetStateAction<UserInterface>>,
    fetchUser: Function,
    updateDetails: Function,
    updatePassword: Function,
    updateAvatar: Function,
    userLogin: Function,
    userRegister: Function
}

export interface UserInterface {
    fullName: string,
    email: string,
    password: string,
    avatar: string,
}


export const UserContext = React.createContext<UserContext>({
    user: {
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    },
    fetchUser: () => {},
    updateDetails: () => {},
    updatePassword: () => {},
    updateAvatar: () => {},
    userLogin: () => {},
    userRegister: () => {},
    setUser: () => {}
})