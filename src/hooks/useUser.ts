import {useQuery} from 'react-query'
import api from 'api'
import {UserContextInterface, User} from 'types/user'

function transformResponse(data: any): User {
  const user = data.data[0]
  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    initials: user.firstName[0] +user.lastName[0],
  }
}

async function getUser() {
  const {data} = await api.get('/users')
  return data
}

export default function useUser(): UserContextInterface {
  const {data: user, isLoading} = useQuery('user', getUser, {
    select: transformResponse,
  })

  return {user, isLoading}
}
