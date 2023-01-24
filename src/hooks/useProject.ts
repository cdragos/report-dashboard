
import api from 'api'
import {useQuery} from 'react-query'
import {ProjectHookInterface, Project} from 'types/project'

/**
 * Transforms the response from the API into a more usable format
 * @param {Object} results - The results from the API
 * @returns {Project[]} - An array of projects
 */
function transformResponse(results: { data: Array<object> }): Project[] {
  return results.data.map(
    (result: any) => ({
      projectId: result.projectId,
      name: result.name,
    })
  )
}

/**
 * Fetches the projects from the API
 * @returns {Promise<Project[]>} - An array of projects
 */
async function getProjects() {
  const {data} = await api.get('/projects')
  return data
}

/**
 * Hook for fetching projects
 * @returns {ProjectHookInterface} - An object containing the projects and a loading state
 */
export default function useProjects(): ProjectHookInterface {
  const {data, isLoading} = useQuery('projects', getProjects, {
    select: transformResponse,
  })
  const projects = data || null;
  return {projects, isLoading}
}
