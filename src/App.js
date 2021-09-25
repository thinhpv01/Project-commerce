import logo from './logo.svg';
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { commerce } from './lib/commerce';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

function App() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
        console.log(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response.cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    if (!commerce) {
        return 'Loading';
    }
    console.log(products);
    return (
        <Router>
            <div className="App">
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route path="/" exact>
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route path="/cart" exact>
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
