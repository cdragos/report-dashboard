export interface Project {
  projectId: string
  name: string
}

export interface ProjectHookInterface {
  projects: Project[] | null
  isLoading: boolean
}

