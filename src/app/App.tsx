import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Routes, Route, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import { HomePage } from '../pages/HomePage/HomePage'
import InfoPage from '../pages/OtherPage/OtherPage'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<InfoPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  )
}

export default App
