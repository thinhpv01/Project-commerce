import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
    },
    media: {
        objectFit: 'cover',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
