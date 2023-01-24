import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {ReactComponent as DashboardSvg} from 'assets/svg/dashboard.svg'

export default function DashboardEmpty() {
  return (
    <Box textAlign="center" maxWidth="500px" m="auto">
      <Typography variant="h1" pb={2}>
        No Reports
      </Typography>
      <Typography variant="h2" color="grey" pb={4}>
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </Typography>
      <DashboardSvg />
    </Box>
  )
}
