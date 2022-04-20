import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from '../pages/HomePage/HomePage'
import OtherPage from '../pages/OtherPage/OtherPage'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  )
}

export default App
