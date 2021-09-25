import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid, Typography } from '@mui/material';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

Cart.propTypes = {
    cart: PropTypes.object,
    handleUpdateCartQty: PropTypes.func,
    handleRemoveFromCart: PropTypes.func,
    handleEmptyCart: PropTypes.func,
};

function Cart({
    cart = {},
    handleUpdateCartQty = null,
    handleRemoveFromCart = null,
    handleEmptyCart = null,
}) {
    const classes = useStyles();
    if (!cart.line_items)
        return <div style={{ marginTop: '5rem', fontSize: '1.5rem' }}>Loading...</div>;
    const isEmpty = !cart.line_items.length;
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your shopping cart
            </Typography>
            {isEmpty && (
                <Typography variant="subtitle1">
                    You have no items in your shopping cart, start add some!!
                    <Link to="/" style={{ color: 'inherit' }}>
                        {' '}
                        Start adding some here
                    </Link>
                </Typography>
            )}
            {!isEmpty && (
                <>
                    <Grid container spacing={3}>
                        {cart.line_items.map((item) => (
                            <Grid item xs={12} sm={4} key={item.id}>
                                <CartItem
                                    item={item}
                                    handleUpdateCartQty={handleUpdateCartQty}
                                    handleRemoveFromCart={handleRemoveFromCart}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <div className={classes.cardDetails}>
                        <Typography variant="h4">
                            Subtotal: {cart.subtotal.formatted_with_symbol}
                        </Typography>
                        <div>
                            <Button
                                className={classes.emptyButton}
                                size="large"
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={handleEmptyCart}
                            >
                                Empty Cart
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/checkout"
                                className={classes.checkOutButton}
                                size="large"
                                type="button"
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: '1.5rem' }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Cart;
