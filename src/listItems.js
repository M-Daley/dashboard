import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
    Card,
    CardContent,
    CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import axios from 'axios';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '45ch',
        height: 100,
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
    },
    image: {
        width: '25%',
    }
});

const mainList = [
    {
        icon: <DashboardIcon />,
        primary: "Dashboard"
    },
    {
        icon: <ShoppingCartIcon />,
        primary: "Orders"
    },
    {
        icon: <PeopleIcon />,
        primary: "Customers"
    },
    {
        icon: <BarChartIcon />,
        primary: "Reports"
    },
    {
        icon: <LayersIcon />,
        primary: "Integrations"
    },
];

const reports = [
    "Current Month",
    "Last Quarter",
    "Year-End Sale"
];

export const mainListItems = (
    <div>
    {mainList.map(({ icon, primary }, idx) => (
        <ListItem button key={`listItem-${idx}`}>
            <ListItemIcon>
                    {icon}
            </ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    ))}
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved Reports</ListSubheader>
        {reports.map((report, idx) => (
            <ListItem button key={idx}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={report}/>
            </ListItem>
        ))}
    </div>
);

export const NotificationMessage = ({
    title,
    date,
    description,
    image,
    imageTitle
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                image={image}
                title={imageTitle}
                style={{
                    height: 200,
                    width: '10ch'
                }}
                className={classes.image}
            />
            <div className={classes.cardDetails}>
                <CardContent>
                    <Typography component="h4" variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" className={classes.date}>
                        {date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph className={classes.description}>
                        {description}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export const generateNotificationMessages = async (amount=0) => {
    let messages = [];
    let date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getYear()];
    date = `${day}-${month + 1}-${year - 100}`

    let res = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/photos')
    ]);

    const [mockMessage, mockImage] = res.map((res) => res.data);

    for (let i=0; i < amount; i++) {
        messages.push({
            title: `${mockMessage[i].title.slice(0, 30)}...`,
            date: date,
            description: `${mockMessage[i].body.slice(0, 30)}...`,
            image: mockImage[i].thumbnailUrl,
            imageTitle: mockImage[i].title
        })
    }

    const notifications = messages.map((message) => (
        <NotificationMessage {...message} />
    ))

    return notifications
};