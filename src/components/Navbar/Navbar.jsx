import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStyles from './styles';
import logo from '../../assets/commerce.png';
import { Link, useLocation } from 'react-router-dom';

Navbar.propTypes = {
    totalItems: PropTypes.number,
};

function Navbar({ totalItems = 0 }) {
    const classes = useStyles();
    const location = useLocation();
    if (location)
        return (
            <>
                <AppBar position="fixed" className={classes.appBar} color="inherit">
                    <Toolbar>
                        {/* <Link to="/" className={classes.link}> */}
                        <Typography component={Link} to="/" className={classes.logo}>
                            <img
                                src={logo}
                                alt="Commerce.js"
                                height="25px"
                                className={classes.image}
                            />
                            Commerce.js
                        </Typography>
                        {/* </Link> */}
                        <div className={classes.grow} />
                        {location.pathname === '/' && (
                            <div className={classes.button}>
                                <IconButton
                                    LinkComponent={Link}
                                    to="/cart"
                                    aria-label="Show cart items"
                                    color="inherit"
                                >
                                    <Badge badgeContent={totalItems} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </>
        );
}

export default Navbar;
