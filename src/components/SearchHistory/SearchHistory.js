import React, { Component } from 'react'

export class SearchHistory extends Component {
  render() {
    const{city, _id, country} = this.props;
    return (
      <li className="list-group-item  bg-transparent">
      <button className="btn btn-warning" style={{margin:"3%"}}onClick={()=>{this.props.handleUpdateWeatherSearch(city, country)}}>Get Weather</button>
      <button className="btn btn-danger" style={{margin:"3%"}}onClick={()=>{this.props.handleDeleteById(_id)}}>delete</button>
      {city}  {country}
      </li>
    )
  }
}

export default SearchHistory
