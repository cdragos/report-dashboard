import React from 'react'
import Grid from '@mui/material/Grid'
import Header from 'components/Header'
import {UserProvider} from 'contexts/UserContext'
import styled from 'styled-components'
import Navbar from 'components/Navbar'
import Dashboard from 'components/Dashboard'

export default function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Container container>
          <Grid item xs={1}>
            <Navbar />
          </Grid>
          <Grid item xs={11}>
            <Dashboard />
          </Grid>
        </Container>
      </UserProvider>
    </>
  )
}

const Container = styled(Grid)`
  padding: ${props => props.theme.spacing(5)} ${props => props.theme.spacing(5)};
`
