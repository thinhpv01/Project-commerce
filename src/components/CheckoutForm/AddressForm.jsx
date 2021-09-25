import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from './CustomTextField';
import { useState } from 'react';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';

AddressForm.propTypes = {
    checkoutToken: PropTypes.object,
    next: PropTypes.func,
};

function AddressForm({ checkoutToken = {}, next = null }) {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const Subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
    }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
            country,
            region: stateProvince,
        });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <FormProvider {...methods}>
                <form
                    defaultValue={{
                        firstName: '',
                        lastName: '',
                        address1: '',
                        email: '',
                        city: '',
                        zip: '',
                    }}
                    onSubmit={methods.handleSubmit((data) =>
                        next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
                    )}
                >
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First name" />
                        <FormInput name="lastName" label="Last name" />
                        <FormInput name="address1" label="Address line 1" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="Zip / Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                variant="standard"
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {Object.entries(shippingCountries)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                variant="standard"
                                onChange={(e) => setShippingSubdivision(e.target.value)}
                            >
                                {Object.entries(shippingSubdivisions)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                variant="standard"
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                {shippingOptions
                                    .map((sO) => ({
                                        id: sO.id,
                                        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                                    }))
                                    .map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" LinkComponent={Link} to="/cart">
                            Back To Cart
                        </Button>
                        <Button variant="contained" type="submit" color="primary">
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm;
