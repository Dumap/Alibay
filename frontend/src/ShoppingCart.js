import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import compose from "recompose/compose";

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };
  }

  displayShoppingCart = () => {
    console.log(this.state.items);
    const { classes } = this.props;
    let totalPrice = this.state.items.reduce((price, item) => +price + +item.price, 0)

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Order summary
              </Typography>
              <List disablePadding>
                {this.state.items.map(product => (
                  <ListItem className={classes.listItem} key={product.title}>
                    <ListItemText primary={product.title} secondary={product.desc.length > 35 ? product.desc.substring(0, 35) + "..." : product.desc} />
                    <Typography variant="body2">${product.price}</Typography>
                  </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    ${totalPrice}
                  </Typography>
                </ListItem>
              </List>
            </React.Fragment>
            <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.props.history.push("/");
                    }}
            >
                Continue Shopping
            </Button>
            <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.props.history.push("/checkout/");
                    }}
            >
                Checkout
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  };

  componentDidMount = () => {
    let itemsId = this.props.cart;
    console.log("itemsId", itemsId);
    let items = [];

    itemsId.forEach(element => {
      console.log("element", element);
      fetch("http://localhost:4001/find-item", {
        method: "POST",
        body: JSON.stringify({ id: element })
      })
        .then(res => res.json())
        .then(responseBody => {
          console.log("rb", responseBody);
          if (responseBody.success === true) {
            this.setState({
              items: this.state.items.concat(responseBody.item)
            });
          }
        });
    });

    console.log("shoppingcart", items);

    this.setState({
      items: items
    });
  };
  render() {
    console.log("state", this.state.items.length, this.state.items);
    return (
      <div>
        {Object.entries(this.state.items).length === 0
          ? "Nothing here"
          : this.displayShoppingCart()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    page: state.page,
    items: state.items,
    cart: state.cart
  };
};

ShoppingCart.propTypes = {
  classes: PropTypes.object.isRequired,
};

let connectShoppingCart = connect(mapStateToProps)(ShoppingCart);

export default compose(withStyles(styles))(withRouter(connectShoppingCart));


