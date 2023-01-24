import {useState} from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Menu from '@mui/material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {Project} from 'types/project'
import {Gateway} from 'types/gateway'

interface Props {
  projects: Project[] | null
  gateways: Gateway[] | null
  handleFilterChange: (
    projectId: number | null,
    gatewayId: number | null,
  ) => void
}

export default function ReportFilters({
  projects,
  gateways,
  handleFilterChange,
}: Props) {
  const [projectsAnchorEl, setProjectsAnchorEl] = useState<null | HTMLElement>(
    null,
  )
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  )
  const [selectedGatewayId, setSelectedGatewayId] = useState<number | null>(
    null,
  )

  const projectsOpen = Boolean(projectsAnchorEl)
  const [gatewaysAnchorEl, setGatewaysAnchorEl] = useState<null | HTMLElement>(
    null,
  )
  const gatewaysOpen = Boolean(gatewaysAnchorEl)

  const handleGenerateReport = () => {
    handleFilterChange(selectedProjectId, selectedGatewayId)
  }

  return (
    <Stack direction="row" justifyContent="flex-end" spacing={2} height="80px">
      <div>
        <Button
          onClick={e => setProjectsAnchorEl(e.currentTarget)}
          aria-controls={projectsOpen ? 'projects-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={projectsOpen ? 'true' : undefined}
          endIcon={<KeyboardArrowDownIcon />}
          variant="contained"
          color="secondary"
        >
          Projects
        </Button>
        <Menu
          id="projects-menu"
          anchorEl={projectsAnchorEl}
          open={projectsOpen}
          onClose={() => setProjectsAnchorEl(null)}
        >
          <MenuItem
            key={0}
            selected={selectedProjectId === null}
            onClick={() => {
              setSelectedProjectId(null)
            }}
          >
            None
          </MenuItem>
          {projects &&
            projects.map(project => (
              <MenuItem
                key={project.projectId}
                selected={project.projectId === selectedProjectId}
                onClick={() => {
                  setSelectedProjectId(project.projectId)
                }}
              >
                {project.name}
              </MenuItem>
            ))}
        </Menu>
      </div>
      <div>
        <Button
          onClick={e => setGatewaysAnchorEl(e.currentTarget)}
          aria-controls={gatewaysOpen ? 'gateways-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={gatewaysOpen ? 'true' : undefined}
          endIcon={<KeyboardArrowDownIcon />}
          variant="contained"
          color="secondary"
        >
          Gateways
        </Button>
        <Menu
          id="gateways-menu"
          anchorEl={gatewaysAnchorEl}
          open={gatewaysOpen}
          onClose={() => setGatewaysAnchorEl(null)}
        >
          <MenuItem
            key={0}
            selected={selectedGatewayId === null}
            onClick={() => {
              setSelectedGatewayId(null)
            }}
          >
            None
          </MenuItem>
          {gateways &&
            gateways.map(gateway => (
              <MenuItem
                selected={gateway.gatewayId === selectedGatewayId}
                onClick={() => {
                  setSelectedGatewayId(gateway.gatewayId)
                }}
                key={gateway.gatewayId}
              >
                {gateway.name}
              </MenuItem>
            ))}
        </Menu>
      </div>
      <div>
        <Button variant="contained" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>
    </Stack>
  )
}
