import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';

const preventDefault = (event) => { event.preventDefault(); };

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const Deposits = () => {
    const classes = useStyles();

    return (
        <>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 march, 2021
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View Balance
                </Link>
            </div>
        </>
    );
};

export default Deposits;