import {useState, useMemo} from 'react'
import Grid from '@mui/material/Grid'
import styled from 'styled-components'
import {Report} from 'types/report'
import {Project} from 'types/project'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

interface Props {
  projects: Project[] | null
  reports: Report[] | null
}
export default function ReportTable({projects, reports}: Props) {
  /* A mapping of project IDs to an array of reports */
  const projectReports: Record<string, Report[]> = useMemo(() => {
    return reports
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
  }, [reports])

  const [visibleProjectIds, setVisibleProjectIds] = useState<string[]>([
    Object.keys(projectReports)[0],
  ])
  /**

    Toggles the visibility of a table for a given project ID.
    @param {string} projectId - The project ID to toggle the visibility of
    */
  const toggleTableVisibility = (projectId: string) => {
    if (visibleProjectIds.includes(projectId)) {
      setVisibleProjectIds(visibleProjectIds.filter(id => id !== projectId))
    } else {
      setVisibleProjectIds([...visibleProjectIds, projectId])
    }
  }

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
          <>
            <ReportHeader
              key={projectId}
              onClick={() => toggleTableVisibility(projectId)}
            >
              <Grid container>
                <Grid item xs={6}>
                  <ReportHeaderTypography>
                    {project?.name}
                  </ReportHeaderTypography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <ReportHeaderTypography>
                    TOTAL: {totalAmount}
                  </ReportHeaderTypography>
                </Grid>
              </Grid>
            </ReportHeader>
            {visibleProjectIds.includes(projectId) && (
              <TableContainer>
                <Table sx={{minWidth: 650}} size="small">
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Gateway</TableCell>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {projectReports[projectId].map(report => (
                      <StyledTableRow key={report.paymentId}>
                        <TableCell>{report.created}</TableCell>
                        <TableCell>{report.gatewayId}</TableCell>
                        <TableCell>{report.paymentId}</TableCell>
                        <TableCell align="right">
                          {report.amount.toFixed(2)}
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
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
  margin-bottom: ${props => props.theme.spacing(2)};
  cursor: pointer;
`

const ReportHeaderTypography = styled(Typography)`
  font-size: '1rem';
  line-height: '1.172rem';
  font-weight: 700;
  color: ${props => props.theme.palette.text.primary};
`

const StyledTableRow = styled(TableRow)`
  td {
    border: none;
  }
  &:nth-of-type(odd) {
    background: ${props => props.theme.palette.background.white};
  }
  &:nth-of-type(even) {
    background: ${props => props.theme.palette.background.lightBlue};
  }
`

const StyledTableHead = styled(TableHead)`
  &:after {
    content: '';
    display: block;
    height: 10px;
  }
  th {
    background: ${props => props.theme.palette.background.white};
    border: none;
  }
  padding: ${props => props.theme.spacing(2)};
  margin-bottom: ${props => props.theme.spacing(2)};
  border: none;
`
