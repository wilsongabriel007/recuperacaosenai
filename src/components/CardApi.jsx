/* eslint-disable react/prop-types */

export const Card = (props) => {
    return(
        <div class="card">
            <h1>{props.name}</h1>
            <h3>{props.species}</h3>
            <p>{props.type}</p>
            <p>{props.gender}</p>
            <img src={props.image} alt={props.name} width={150} height={"auto"}/>
            <h2>{props.status}</h2>
        </div>
    )
  }