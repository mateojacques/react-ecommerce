import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { commerce } from './lib/commerce'
import { ThemeProvider } from '@material-ui/core/styles'
import { Products, Navbar, Cart, Checkout } from './components'
import theme from './theme'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)

    setCart(cart)
  }

  const handleUpdateCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart)
  }

  const handleEmptyCart = async (productId) => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )

      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <>
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path='/'>
              <Products products={products} onAddToCart={handleAddToCart} />
            </Route>

            <Route exact path='/cart'>
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>

            <Route exact path='/checkout'>
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
          </Switch>
        </>
      </Router>
    </ThemeProvider>
  )
}

export default App
