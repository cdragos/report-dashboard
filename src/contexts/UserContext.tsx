import React from 'react'
import useUser from 'hooks/useUser'
import {UserContextInterface} from 'types/user'

interface Props {
  children: React.ReactNode
}

const UserContext = React.createContext<UserContextInterface>({
  user: null,
  isLoading: true,
})

const UserProvider = ({children}: Props) => {
  const {user, isLoading} = useUser()

  return (
    <UserContext.Provider value={{user, isLoading}}>
      {children}
    </UserContext.Provider>
  )
}

function useUserContext() {
  return React.useContext(UserContext)
}

export {UserProvider, useUserContext}
