import Stack from '@mui/material/Stack'
import {ReactComponent as ChartsSvg} from 'assets/svg/charts.svg'
import {ReactComponent as AppsMenuSvg} from 'assets/svg/apps-menu.svg'
import {ReactComponent as MonitorMenuSvg} from 'assets/svg/monitor-menu.svg'
import {ReactComponent as PieChartsMenuSvg} from 'assets/svg/pie-charts-menu.svg'
import {ReactComponent as LogoutMenuSvg} from 'assets/svg/logout-menu.svg'

export default function Navbar() {
  return (
    <Stack spacing={2}>
      <div>
        <ChartsSvg />
      </div>
      <div>
        <AppsMenuSvg />
      </div>
      <div>
        <MonitorMenuSvg />
      </div>
      <div>
        <PieChartsMenuSvg />
      </div>
      <div>
        <LogoutMenuSvg />
      </div>
    </Stack>
  )
}
