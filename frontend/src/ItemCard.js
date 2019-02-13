import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import compose from "recompose/compose";

const styles = {
  card: {
<<<<<<< Updated upstream
    position: "relative",
    maxWidth: 345
=======
    position: "relative"
>>>>>>> Stashed changes
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
};

<<<<<<< Updated upstream
class ItemCard extends Component{
  render(){
=======
class ItemCard extends Component {
  render() {
>>>>>>> Stashed changes
    return (
      <Card className={this.props.classes.card}>
        <CardActionArea
          onClick={() => {
            this.props.dispatch({
              type: "changePage",
              content: "Item Detail"
            });
            this.props.history.push("/itemdetail/" + this.props.elem._id);
          }}
        >
          <CardMedia
            component="img"
            alt={this.props.elem.title}
            className={this.props.classes.media}
            height="140"
            src={this.props.elem.img}
            title={this.props.elem.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.elem.title}
            </Typography>
            <Typography component="p">{this.props.elem.desc}</Typography>
            <Typography
              className={this.props.classes.pos}
              color="textSecondary"
            >
              Price: ${this.props.elem.price}
            </Typography>
            <Typography
              className={this.props.classes.pos}
              color="textSecondary"
            >
              Seller: {this.props.elem.seller}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
<<<<<<< Updated upstream
          <Button size="small" color="primary" onClick={this.handleOnClickBuy}>
=======
          <Button size="small" color="primary">
>>>>>>> Stashed changes
            Buy
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    page: state.page,
    items: state.items,
    cart: state.cart
  };
};

let connectItemCard = connect(mapStateToProps)(ItemCard);

export default compose(withStyles(styles))(withRouter(connectItemCard));
