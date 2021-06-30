import React, { Component } from 'react'

export class SearchHistory extends Component {
  render() {
    const{city, _id, country} = this.props;
    return (
      <li className="bg-transparent">
      <div className="btn-group btn-group-sm">
      <button className="button-get " style={{margin:"3%"}}onClick={()=>{this.props.handleUpdateWeatherSearch(city, country)}}>Get Weather</button>
      <button className="button-delete " style={{margin:"3%"}}onClick={()=>{this.props.handleDeleteById(_id)}}>delete</button>
      </div>
     
      <span>{city+' '+country}</span>

      
      </li>
    )
  }
}

export default SearchHistory
