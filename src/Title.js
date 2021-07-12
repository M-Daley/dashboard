import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.secondary.dark,
    },
}));

const Title = (props) => {
    const classes = useStyles();

    return (
        <Typography component="h2" variant="h6" gutterBottom className={classes.title}>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node
};

export default Title;