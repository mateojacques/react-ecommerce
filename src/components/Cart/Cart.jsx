import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles'

const Cart = ({
  cart,
  handleUpdateCart,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles()
  const EmptyCart = () => {
    return (
      <Typography variant='subtitle1'>
        You have no items in the cart,
        <Link to='/' className={classes.link}>
          start adding some!
        </Link>
      </Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
              ></CartItem>
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h6'>
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.emptyButton}
              size='large'
              type='button'
              variant='contained'
              color='primary'
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to='/checkout'
              className={classes.checkoutButton}
              size='large'
              type='button'
              variant='contained'
              color='secondary'
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (!cart.line_items) return 'Loading...'

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h4' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
