import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import {
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

Checkout.propTypes = {
    cart: PropTypes.object,
};

const steps = ['Shipping address', 'Payment details'];

function Checkout({ cart = {}, onCaptureCheckout, order, error }) {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    console.log({ token });
                    setCheckoutToken(token);
                } catch (error) {}
            };
            generateToken();
        }
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    };

    let Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstName}{' '}
                        {order.customer.lastName}!
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to home
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to home
                </Button>
            </>
        );
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
            />
        );
    return (
        <div className={classes.form}>
            <CssBaseline />
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <conFirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </div>
    );
}

export default Checkout;
