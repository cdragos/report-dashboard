
export interface Report {
  paymentId: string
  amount: number
  projectId: string
  gatewayId: string
  modified: string
  created: string
}

export interface ReportHookInterface {
  reports: Report[] | null
  isLoading: boolean
}
