import React from 'react'
import {
  Paper,
  Typography,
} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    textAlign: 'center',
    paddingBottom: '1px'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper} color="primary">
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
