import {Grid} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useGateways from 'hooks/useGateway'
import useProjects from 'hooks/useProject'
import useReport from 'hooks/useReport'
import {useState} from 'react'
import DashboardEmpty from './DashboardEmpty'
import ReportFilters from './ReportFilters'
import ReportTable from './ReportTable'

export default function Dashboard() {
  const {projects, isLoading: isLoadingProjects} = useProjects()
  const {gateways, isLoading: isLoadingGateways} = useGateways()
  const isFilterLoading = isLoadingProjects && isLoadingGateways

  const [projectId, setProjectId] = useState<string | null>(null)
  const [gatewayId, setGatewayId] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleFilterChange = (
    projectId: string | null,
    gatewayId: string | null,
    startDate: Date | null,
    endDate: Date | null,
  ) => {
    setProjectId(projectId)
    setGatewayId(gatewayId)
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const {reports, isLoading: isLoadingReports} = useReport({
    projectId,
    gatewayId,
    startDate,
    endDate,
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
      <Box mt={5}>
        {isLoadingReports ? (
          <div>Loading...</div>
        ) : reports && reports.length > 0 ? (
          <ReportTable projects={projects} reports={reports} />
        ) : (
          <DashboardEmpty />
        )}
      </Box>
    </Box>
  )
}
