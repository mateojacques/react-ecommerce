import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import logo from '../../assets/store-logo.png'
import useStyles from './styles'

const Navbar = ({ totalItems }) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='primary'>
        <Toolbar>
          <Typography component={Link} to='/' className={classes.link}>
            <img
              src={logo}
              alt='GSEI Store'
              height='40px'
              className={classes.image}
            />
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to='/cart'
                aria-label='Show cart items'
                color='inherit'
              >
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
