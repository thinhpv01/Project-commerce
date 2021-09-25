import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    appBar: {
        boxShadow: '0 0 4px rgba(0,0,0,.2) !important',
    },
    grow: {
        flex: '1',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem !important',
        textDecoration: 'none !important',
        color: 'inherit',
        '& > img': {
            marginRight: '.5rem',
        },
    },
}));
