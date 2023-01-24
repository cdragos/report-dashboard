export interface User {
  userId: number
  firstName: string
  lastName: string
  email: string
  initials: string
}

export interface UserContextInterface {
  user: User | null
  isLoading: boolean
}

