import {Typography} from '@mui/material'
import Grid from '@mui/material/Grid'
import styled from 'styled-components'
import {Report} from 'types/report'
import {Project} from 'types/project'

interface Props {
  projects: Project[] | null
  reports: Report[] | null
}
export default function ReportTable({projects, reports}: Props) {
  const projectReports = reports
    ?.sort((a, b) => {
      if (a.created < b.created) return 1
      if (a.created > b.created) return -1
      return 0
    })
    .reduce((acc: any, report: Report) => {
      const projectReports = acc[report.projectId] || []
      projectReports.push(report)
      acc[report.projectId] = projectReports
      return acc
    }, {})

  return (
    <ReportContainer>
      {Object.keys(projectReports).map((projectId: string) => {
        const project = projects?.find(
          project => project.projectId === projectId,
        )
        const totalAmount = projectReports[projectId]
          .reduce((sum: number, report: Report) => sum + report.amount, 0)
          .toFixed(2)
        return (
          <ReportHeader key={projectId}>
            <Grid container>
              <Grid item xs={6}>
                <ReportHeaderTypography>{project?.name}</ReportHeaderTypography>
              </Grid>
              <Grid item xs={6}>
                <ReportHeaderTypography>
                  TOTAL: {totalAmount}
                </ReportHeaderTypography>
              </Grid>
            </Grid>
          </ReportHeader>
        )
      })}
    </ReportContainer>
  )
}

const ReportContainer = styled.div`
  background: ${props => props.theme.palette.background.lightBlue};
  border-radius: 10px;
  padding: ${props => props.theme.spacing(2)};
`

const ReportHeader = styled.div`
  background: ${props => props.theme.palette.background.white};
  border-radius: 10px;
  padding: ${props => props.theme.spacing(2)};
`

const ReportHeaderTypography = styled(Typography)`
  font-size: '1rem';
  line-height: '1.172rem';
  font-weight: 700;
  color: ${props => props.theme.palette.text.primary};
`
