import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    media: {
        height: 250,
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cartActions: {
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        '& button': {
            fontSize: '1.3rem',
            padding: '0',
        },
    },
}));
