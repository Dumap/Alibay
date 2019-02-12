import React, { Component } from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Socket from "./Socket";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  textField: {
    minWidth: "60%"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: this.props.username,
      location: "Montréal, Qc",
      title: "This is an item",
      desc:
        "Monkey is a common name that may refer to groups or species of mammals, in part, the simians of infraorder Simiiformes.",
      price: 900,
      img: "image.jpg"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleToggle(event) {
    console.log("toggled");
  }

  handleSubmit(event) {
    event.preventDefault();

    Socket.emit("add-item", {
      seller: this.props.username,
      location: this.state.location,
      title: this.state.title,
      desc: this.state.desc,
      price: this.state.price
    });
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Sell Item"
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="outlined-uncontrolled"
                label="title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-uncontrolled"
                label="description"
                className={classes.textField}
                value={this.state.desc}
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-uncontrolled"
                label="price"
                className={classes.textField}
                value={this.state.price}
                onChange={this.handleChange("price")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-uncontrolled"
                label="image"
                className={classes.textField}
                value={this.state.img}
                onChange={this.handleChange("image")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-uncontrolled"
                label="location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange("location")}
                margin="normal"
                variant="outlined"
              />
              <RaisedButton
                label="Submit"
                primary={true}
                style={style}
                onClick={event => this.handleSubmit(event)}
              />
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};

AddItem.propTypes = {
  classes: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username
  };
};

let connectAddItem = connect(mapStateToProps)(withRouter(AddItem));

export default withStyles(styles)(connectAddItem);
