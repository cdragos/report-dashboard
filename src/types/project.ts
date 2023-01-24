export interface Project {
  projectId: number
  name: string
}

export interface ProjectContextInterface {
  projects: Project | undefined | null
  isLoading: boolean
}

