import React from 'react'
import {
  Paper,
  Typography,
} from '@material-ui/core'

const Header = () => {
  const style = {
    backgroundColor: 'primary',
    textAlign: 'center',
  }

  return (
    <Paper style={style} color="primary">
      <Typography variant="h1" component="h1" gutterBottom>
        Webtools für die Lehre
      </Typography>
      <Typography variant="h2" component="h1" gutterBottom>
        Principal Component Analysis (PCA)
      </Typography>
    </Paper>
    )
}

export default Header
