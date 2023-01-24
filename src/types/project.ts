export interface Project {
  projectId: number
  name: string
}

export interface ProjectHookInterface {
  projects: Project[] | null
  isLoading: boolean
}

