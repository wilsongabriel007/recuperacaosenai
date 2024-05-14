/* eslint-disable react/prop-types */

export const CardApi = (props) => {
    return(
        <div class="card">
            <h1>{props.name}</h1>
            <h2>{props.species}</h2>
            <h3>{props.type}</h3>
            <h4>{props.gender}</h4>
            <img src={props.image} alt={props.name} width={150} height={"auto"}/>
            <h2>{props.status}</h2>
        </div>
    )
  }