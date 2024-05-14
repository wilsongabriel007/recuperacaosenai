import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { CardApi } from './components/CardApi';
import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import style from './App.module.css';

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'



function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [searchName, setName] = useState("")
  const geoData = ({lat:-25.4249668, lng:-49.2748863})

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${searchName}`).then((response) => {
      if(!response.data.results){
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if(error.response.status === 404){
        console.log("Esta página não contém este personagem")
      }
      console.error(error)
    })
  }, [page, searchName])

  return (
    <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
      <button onClick={() => setShow("graf")}>Gráfico</button>
    </div>
    <div  className={style.wrapPage}>
      {show === "prod" &&
      <>
        <h2>Showroom de produtos</h2>
        <div style={{display: "flex", flexdirection: "row"}}>
          <div style={{display: "flex", flexwrap: "wrap"}}>
            {produtos.map((item) => (
              <div key={item.id}>
                <Card
                name={item.name}
                desc={item.desc}
                categ={item.categ}
                value={item.value}
                image={item.image}
                status={item.status === "disponivel" ? (
                  <div style={{ background: "green",height: "15px",
                  width: "15px",
                  borderRadius: "100cap"}}></div>
                ) : item.status === "indisponível" ? (
                  <div style={{ background: "red", height: "15px",
                  width: "15px",
                  borderRadius: "100cap"}}></div>
                ) : (
                  <div style={{ background: "grey", height: "15px",
                  width: "15px",
                  borderRadius: "100cap"}}></div>
                )}
                />
              </div>
            ))}
        </div>
            </div>
            </>
          }
     {show === "api" &&
          <div className={style.Api}>
          <h2 style={{fontSize: "31px", padding: "17px", gap:"10px"}}>Rick and Morty API</h2>
            <div>
              <div style={{display: "inline-block"}}>
                <h5>Número página</h5>
                <input type="text" placeholder="1/43" value={page} onChange={(eventPage) => setPage(eventPage.target.value)}/>
                <br />
                <br />
                <h5>Nome do personagem</h5>
                <input type="text" placeholder="Name" value={searchName} onChange={(eventName) => setName(eventName.target.value)}/>
            </div> 
            </div>
            <div className={style.inlineElements}>
            {data.map((item) => { 
                return(
                <div key={item.id}>
                  <CardApi 
                  name={item.name} 
                  species={item.species}
                  type={item.type}
                  gender={item.gender}
                  image={item.image} 
                  status={item.status === "Alive" ? (
                  <div style={{ color: "green"}}>Alive</div>
                ) : item.status === "Dead" ? (
                  <div style={{ color: "red"}}>Dead</div>
                ) : (
                  <div style={{ color: "grey"}}>unknown</div>
                )}
                  />
                  {/* <button onClick={() => {}}>Info</button> */}
                </div>
                )
           })}
            </div>
        </div>
      }
     {show === "map" && (
      <div className={style.wrapPage}>
        <h2>Mapa</h2>
        <div className={style.maps}>
        <MapContainer center={[geoData.lat, geoData.lng]} zoom={32} scrollWheelZoom={false} style={{width: "100%", height: "100%"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geoData.lat && geoData.lng &&
            <Marker position={[geoData.lat, geoData.lng]}>
              <Popup>
                <a target='_blank' href={`https://www.google.com.br/maps/place/Sistema+Fiep+-+Unidade+Centro/@${geoData.lat},${geoData.lng},17z/data=!3m1!4b1!4m6!3m5!1s0x94dce41197a84179:0x142fc7abe5169a05!8m2!3d-25.4249717!4d-49.272306!16s%2Fg%2F1ptznr269?entry=ttu`}>Google maps view</a>
              </Popup>
            </Marker>}
          </MapContainer>
      </div>
        </div>
    )}
     {show === "graf" && (
      <>
      <div>
        <h2>Gráfico 1</h2>      
        <h2>Gráfico 2</h2>
      </div>
      </>
     )}
    </div>
    </>
  )
}

export default App
