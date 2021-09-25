import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useStyles from './styles';
Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product = {}, onAddToCart = null }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                component="img"
                image={product.media.source}
                title={product.name}
                height="194"
            ></CardMedia>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
                </div>
                <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    color="textSecondary"
                />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product;
