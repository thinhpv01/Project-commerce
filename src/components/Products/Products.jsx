import React from 'react';
import { Grid } from '@mui/material';
import Product from './Product/Product';
import useStyles from './styles';
import PropTypes from 'prop-types';

Products.propTypes = {
    products: PropTypes.array,
    onAddToCart: PropTypes.func,
};

function Products({ products = [], onAddToCart = null }) {
    const classes = useStyles();
    return (
        <main style={{ marginTop: '5rem' }}>
            <div className={classes.toolbar} />
            <Grid container spacing={4} justifyContent="center">
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;
