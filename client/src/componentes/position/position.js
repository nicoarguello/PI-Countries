import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from 'react'
import { location } from "actions";


 const Position = function () {

const dispatch = useDispatch()

let position = useSelector((x) => x.position);
  // let variable= useSelector(x=> x.variable)
  // let num= useSelector(x => x.numeros)
  console.log(position)

  useEffect(() => {
    dispatch(location());
  }, [dispatch]);
 
    return (
        <div>
            <h1>POSITION</h1>
            <ul>
                
                   <p>Latitud = {position.latitude}</p> 
                   <p>longitud = {position.longitude}</p>  

                    
                
            </ul>
            
        </div>
    )
}


export default Position