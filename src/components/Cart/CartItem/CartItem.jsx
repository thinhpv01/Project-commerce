import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

CartItem.propTypes = {
    item: PropTypes.object,
    handleUpdateCartQty: PropTypes.func,
    handleRemoveFromCart: PropTypes.func,
};

function CartItem({ item = {}, handleUpdateCartQty = null, handleRemoveFromCart = null }) {
    console.log(item);
    const classes = useStyles();
    return (
        <Card>
            <CardMedia
                className={classes.media}
                component="img"
                image={item.media.source}
                alt={item.name}
            ></CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button
                        type="button"
                        size="small"
                        color="inherit"
                        onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
                    >
                        -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                        type="button"
                        size="small"
                        color="inherit"
                        onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}

export default CartItem;
