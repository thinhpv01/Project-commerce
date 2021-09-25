import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    toolbar: {
        marginTop: '6rem',
    },
    form: {
        maxWidth: '600px',
        width: 'calc(100% - 2rem)',
        margin: '0 auto',
    },
    layout: {},
    paper: {
        '& h4': {
            marginBottom: '1.5rem',
        },
        padding: '1.5rem',
    },
    stepper: {
        marginBottom: '2rem',
    },
}));
