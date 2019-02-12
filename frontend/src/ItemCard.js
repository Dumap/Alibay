import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    position: "relative",
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ItemCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.elem.img}
          className={classes.media}
          height="140"
          image="../cat.jpeg"
          title={props.elem.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.elem.title}
          </Typography>
          <Typography component="p">
            {props.elem.desc}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Price: ${props.elem.price}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Seller: {props.elem.seller}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);