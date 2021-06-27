import React, { Component } from 'react'
export class Weather extends Component {
  render( ) {

   const {city,  
    temperature, 
    temp_min, 
    temp_max, 
    description,
    weatherIcon} = this.props

    return (
    <div className="container">
      <div className="cards PT-4">
        <h1>{city} </h1>
        <h5 className="py-4">
          <i className={`wi ${weatherIcon} display-1`}></i>
        </h5>
       
        {temperature? <h1 className="py-2">{temperature}&deg;</h1>:null}

         {/**show min and max temp */}
         {minmaxTemp(temp_min, temp_max)}

         <h4 className="py-3">{description}</h4>
      </div>
    </div>
    )
  }
}

export default Weather


function minmaxTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}