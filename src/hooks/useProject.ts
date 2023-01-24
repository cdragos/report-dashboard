
import api from 'api'
import {useQuery} from 'react-query'
import {ProjectHookInterface, Project} from 'types/project'

function transformResponse(results: { data: Array<object> }): Project[] {
  return results.data.map(
    (result: any) => ({
      projectId: result.projectId,
      name: result.name,
    })
  )
}

async function getProjects() {
  const {data} = await api.get('/projects')
  return data
}

export default function useProjects(): ProjectHookInterface {
  const {data, isLoading} = useQuery('projects', getProjects, {
    select: transformResponse,
  })
  const projects = data || null;
  return {projects, isLoading}
}
