import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

FormInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

function FormInput({ name = '', label = '' }) {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <TextField
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        inputRef={ref}
                        label={label}
                        required
                        variant="standard"
                        fullWidth
                    />
                )}
            />
        </Grid>
    );
}

export default FormInput;
