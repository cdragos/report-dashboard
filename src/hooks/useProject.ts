
import api from 'api'
import {useQuery} from 'react-query'
import {ProjectContextInterface, Project} from 'types/project'

function transformResponse(data: any): Project {
  const project = data.data[0]
  return {
    projectId: project.projectId,
    name: project.name,
  }

}

async function getProjects() {
  const {data} = await api.get('/projects')
  return data
}

export default function useProjects(): ProjectContextInterface {
  const {data: projects, isLoading} = useQuery('projects', getProjects, {
    select: transformResponse,
  })

  return {projects, isLoading}
}
