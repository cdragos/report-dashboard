import Grid from '@mui/material/Grid'
import styled from 'styled-components'
import {ReactComponent as LogoSvg} from 'assets/svg/logo.svg'
import {ReactComponent as NavToggleSvg} from 'assets/svg/nav-toggle.svg'
import {useUserContext} from 'contexts/UserContext'
import Skeleton from '@mui/material/Skeleton'

export default function Header() {
  const {user, isLoading} = useUserContext()

  return (
    <HeaderContainer container>
      <Grid item xs={6}>
        <SvgContainer>
          <LogoSvg />
          <NavToggleSvg />
        </SvgContainer>
      </Grid>
      <Grid item xs={6}>
        <UserContainer>
          {isLoading ? (
            <>
              <Skeleton variant="rounded" width={43} height={43} />
              <Skeleton variant="rounded" width={70} height={43} />
            </>
          ) : (
            <>
              <UserAvatar>{user && user.initials}</UserAvatar>
              <UserName>
                {user && `${user.firstName} ${user.lastName}`}
              </UserName>
            </>
          )}
        </UserContainer>
      </Grid>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Grid)`
  border: 2px solid ${props => props.theme.palette.border.base};
  padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(5)};
  width: 100%;
  height: 80px;
`

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  justify-content: start;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: end;
`

const UserAvatar = styled.div`
  width: 43px;
  height: 43px;
  background-color: ${props => props.theme.palette.background.yellow};
  border-radius: ${props => props.theme.shape.borderRadius}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.438rem;
  font-weight: 700;
  color: ${props => props.theme.palette.text.white};
`

const UserName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.palette.text.link};
`
