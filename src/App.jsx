import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'


function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")


  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if(!response.data.results){
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if(error.response.status === 404){
        console.log("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page])

  return (
    <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
    </div>
    <div  className={style.wrapPage}>
      <h1>Exercícios de manutenção</h1>
     {show === "prod" &&
        <>
        <h2>Showroom de produtos</h2>
<div>
  {produtos.map((item) => (
    <div key={item.id}>
      <Card
        name={item.name}
        desc={item.desc}
        categoria={item.categoria}
        status={item.status}
        value={item.value}
        image={item.image}
      />
      <div>
        {item.status === "Venda" ? (
          <div style={{ background: "green", width: "100px" }}>Venda</div>
        ) : item.status === "Mostruario" ? (
          <div style={{ background: "red", width: "100px" }}>Mostruario</div>
        ) : (
          <div style={{ background: "grey", width: "100px" }}>Desconhecido</div>
        )}
      </div>
    </div>
  ))}
</div>
        </>
      }
     {show === "api" &&
        <>
          <h2>Rick and Morty API</h2>
            <div>
               <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)}/>
            </div>
            <div>
            {data.map((item) => { 
             return(
              <div key={item.id}>
                <Card name={item.name} desc={item.species} value={item.gender} image={item.image} />
                {/* <button onClick={() => {}}>Info</button> */}
              </div>
              )
           })}
            </div>
       </>
      }
     {show === "map" &&
      <>
      <div>
            <h2>Mapa</h2>
                <div>
                    <MapContainer center={[geoData.lat, geoData.lng]} zoom={14} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {geoData.lat && geoData.lng &&
                        <Marker position={[geoData.lat, geoData.lng]}>
                            <Popup>
                                <a target='_blank' href={`https://maps.app.goo.gl/1KPECwgY8t2cv8k17/@${geoData.lat},${geoData.lng},17z/data=!3m1!4b1!4m6!3m5!1s0x94dce41197a84179:0x142fc7abe5169a05!8m2!3d-25.4249717!4d-49.272306!16s%2Fg%2F1ptznr269?entry=ttu`}>Google maps view</a>
                            </Popup>
                        </Marker>}
                    </MapContainer>
                </div>
            </div>
         </>
      }
    </div>
    </>
  )
}

export default App
