import React, { Component } from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

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
      img: "img.jpg"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleOnChangeImage = event => {
    console.log("handleOnChangeImage");
    console.log(event.target.files[0]);
    this.setState({ img: event.target.files[0] });
  };

  handleToggle(event) {
    console.log("toggled");
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("CHANGING");
    const file = this.state.img;
    const formData = new FormData();
    formData.append("avatar", file);
    console.log("formatData", formData);
    fetch("http://localhost:4001/uploadImage", {
      body: file,
      method: "POST",
      headers: { name: file.name }
    })
      .then(x => x.text())
      .then(responseBody => {
        let path = JSON.parse(responseBody).path;

        let body = JSON.stringify({
          seller: this.props.username,
          location: this.state.location,
          title: this.state.title,
          desc: this.state.desc,
          price: this.state.price,
          img: path
        });

        fetch("http://localhost:4001/add-item", {
          method: "POST",
          body: body,
          image: formData
        })
          .then(res => res.json())
          .then(responseBody => {});
      });

    this.props.history.push("/");
  }

  renderDisplay = () => {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
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
              {/* <TextField
                id="outlined-uncontrolled"
                label="image"
                className={classes.textField}
                value={this.state.img}
                onChange={this.handleChange("image")}
                margin="normal"
                variant="outlined"
              /> */}
              <input
                type="file"
                id="single"
                name="avatar"
                onChange={this.handleOnChangeImage}
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
                primary={false}
                style={style}
                color="#FFFFFF"
                backgroundColor="#3d54b3"
                onClick={event => this.handleSubmit(event)}
              />
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  };

  renderLoggin = () => {
    return (
      <div>
        You need to be logged in to see this page.
        <Link to={"/loginscreen/"}>Login/Signin</Link>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.isLogin === true
          ? this.renderDisplay()
          : this.renderLoggin()}
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
    username: state.username,
    page: state.page,
    items: state.items,
    cart: state.cart
  };
};

let connectAddItem = connect(mapStateToProps)(withRouter(AddItem));

export default withStyles(styles)(connectAddItem);