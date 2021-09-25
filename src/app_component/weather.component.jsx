import React from "react";

const Weather=props=>{
    return(
       <div className="container text-light">
        <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
        <i class={`wi ${props.WeatherIcon} display-1`}></i>
        </h5>
        {props.temp_celcius?   <h1 className="py-2">{props.temp_celcius}&deg;</h1>:null}
        { /** need to specify curly to call a fn */}
        {minmaxTemp(props.temp_max,props.temp_min)}
        <h4 className="py-4">{props.description}</h4>
        </div>
       </div>
        
    );
}

function minmaxTemp(min,max)
{
   if(min && max)
   {
    return(
        <h3>
            <span className="px-4">Min:{min}&deg;</span>
            <span className="px-4">Max:{max}&deg;</span>
        </h3>
    );
   }
}

export default Weather;