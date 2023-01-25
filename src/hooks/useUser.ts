import {useQuery} from 'react-query'
import api from 'api'
import {UserContextInterface, User} from 'types/user'

/**
 * Transforms the response from the API into a more usable format
 * @param {Object} data - The results from the API
 * @returns {User}
 */
function transformResponse(data: {data: Array<any>}): User {
  const user = data.data[0]
  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    initials: user.firstName[0] +user.lastName[0],
  }
}

/**
 * Fetches the user from the API
 * @returns {Promise<User>}
 */
async function getUser() {
  const {data} = await api.get('/users')
  return data
}

/**
 * Hook for fetching the user from the API
 * @returns {UserContextInterface}
 */
export default function useUser(): UserContextInterface {
  const {data, isLoading} = useQuery('user', getUser, {
    select: transformResponse,
  })
  const user = data || null;
  return {user, isLoading}
}
