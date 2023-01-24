import {Grid} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useGateways from 'hooks/useGateway'
import useProjects from 'hooks/useProject'
import useReport from 'hooks/useReport'
import {useState} from 'react'
import DashboardEmpty from './DashboardEmpty'
import ReportFilters from './ReportFilters'

export default function Dashboard() {
  const {projects, isLoading: isLoadingProjects} = useProjects()
  const {gateways, isLoading: isLoadingGateways} = useGateways()
  const isFilterLoading = isLoadingProjects && isLoadingGateways

  const [projectId, setProjectId] = useState<number | null>(null)
  const [gatewayId, setGatewayId] = useState<number | null>(null)
  const handleFilterChange = (
    projectId: number | null,
    gatewayId: number | null,
  ) => {
    setProjectId(projectId)
    setGatewayId(gatewayId)
  }

  const {reports, isLoading: isLoadingReports} = useReport({
    projectId,
    gatewayId,
  })

  return (
    <Box>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h1" pb={1}>
            Reports
          </Typography>
          <Typography variant="h2" color="grey">
            Easily generate a report of your transactions
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {isFilterLoading ? (
            <div>Loading...</div>
          ) : (
            <ReportFilters
              projects={projects}
              gateways={gateways}
              handleFilterChange={handleFilterChange}
            />
          )}
        </Grid>
      </Grid>
      <Box mt={15}>
        <DashboardEmpty />
      </Box>
    </Box>
  )
}
