import React, { Component } from 'react'
import "./Form.css";
export class Form extends Component {
  render() {
    console.log(this)
    return (
      <div className="container h-100">
      <form onSubmit={this.props.getWeather}>
        <div>{this.props.error ? error() : ""}</div>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
              autoFocus
              value={this.props.formValueCity}
              onChange={this.props.handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
              value={this.props.formValueCountry}
              onChange={this.props.handleOnChange}
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};
 
export default Form
