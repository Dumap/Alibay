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
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    marginTop: 25,
    width: 600
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  }
};

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  handleOnClickBuy = event => {
    this.props.dispatch({ type: "add-to-cart", itemId: this.props.item });
    console.log("cart", this.props.cart);
    this.props.history.push("/shoppingcart");
  };
  displayItem = () => {
    if (Object.entries(this.state.item).length === 0) {
      return <div>This item does not exist.</div>;
    } else {
      return (
        <div className={this.props.classes.container}>
          <Card className={this.props.classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={this.state.item.title}
                className={this.props.classes.media}
                height="240"
                src={this.state.item.img}
                title={this.state.item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.state.item.title}
                </Typography>
                <Typography component="p" paragraph align="left">
                  {this.state.item.desc}
                </Typography>
                <Typography variant="h6" align="left" paragraph>
                  Price: ${this.state.item.price}
                </Typography>
                <Typography variant="h6" align="left" paragraph>
                  Seller: {this.state.item.seller}, {this.state.item.location}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button color="primary" onClick={this.handleOnClickBuy}>
                Buy
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    }
  };
  componentDidMount = () => {
    let itemId = this.props.item;
    console.log(itemId);
    if (itemId.length === 24) {
      fetch("http://localhost:4001/find-item", {
        method: "POST",
        body: JSON.stringify({ id: itemId })
      })
        .then(res => res.json())
        .then(responseBody => {
          if (responseBody.success === true) {
            this.setState({
              item: responseBody.item
            });
          } else {
            this.setState({
              item: {}
            });
            return;
          }
        });
    } else {
      this.setState({
        item: {}
      });
    }
  };
  render() {
    return this.displayItem();
  }
}

ItemDetail.propTypes = {
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

let connectItemDetail = connect(mapStateToProps)(ItemDetail);

export default compose(withStyles(styles))(withRouter(connectItemDetail));
