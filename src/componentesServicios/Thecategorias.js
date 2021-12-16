import  Axios  from "axios"
//import PropTypes from 'prop-types';
import './Thecategorias.css'
//import { Categorias } from '../Data/DataServicios';
import {Link} from "react-router-dom"
import React, {useState, useEffect } from "react"
import Swal from 'sweetalert2'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';




export const Thefiltro = props=> {
  const [buscar, setbuscar] = useState()
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        
        value= {buscar}
        onChange= {(e)=>{props.onChange(e); setbuscar(e.target.value)}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={()=>{props.onClick('buscar')}}  sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={()=>{props.onClick('borrar'); setbuscar('') }} color="primary" sx={{ p: '10px' }} aria-label="directions" >
        <BackspaceIcon />
      </IconButton>
    </Paper>
  );
}


const Thecategorias = props => {
  
  //const x = Categorias() este es el array de Dataservicios [categorias 'activas']
   // const categorias= [
  //     {
  //       foto: "https://placeimg.com/220/220/people",
  //       nombre:"Tutores academicos",
  //       descripcion:"Encuentre tutores en temas de Idiomas, Matematicas, Escritura, Programacion y        mucho mas" }]
  const [categorias, setcategorias] = useState([]);
  const [valorBusqueda,setvalorbusqueda] = useState("")
  
  console.log('filtro:' + valorBusqueda)
  useEffect(() => {
    filtroCategorias()
    
  },[] )
  
  //METODO Listar con filtro por valor de busqueda, si es vacio lista todas las categorias 'activas'
   const filtroCategorias= async()=>{ 
     //const token = sessionStorage.getItem('token')  para la Auth
     const respuesta = await Axios.get('/categoria/listxfiltro',{ headers: { filtro: valorBusqueda } } 
     ).then(response=>{
       setcategorias(response.data)
       console.log(response.data)
     }).catch(error=>{
       console.log(error.response)
       Swal.fire({
         icon: "error",
         title: error.response.data.message,
         showConfirmButton: false,
         timer: 2000 })
       return error.response
     })
    
   }

 const ciclarCategorias = categorias.map((item, index) => {
  
  return (
    <div key={index} className="card-user">
      <div className="card-foto">
       
        <Link to="/servicios" > <img  src={item.foto} alt="foto" title="Dar Click" 
        onClick={()=>props.onClick(index)} /> </Link> 
        {/* pasandoFunciones con props  */}
        
      </div> 

      <div className="card-name">
        <h4>{item.nombre}</h4>
        <p> {item.descripcion}  </p>
      </div>

    </div>

  )
 });


  return (
    <> 
     <hr />
    <Thefiltro onClick={(x)=>{ if (x === "buscar") {
      filtroCategorias()
      setvalorbusqueda('')
    } else if (x==="borrar"){
      filtroCategorias()    }
    } }  
      onChange={(e)=>{ setvalorbusqueda(e.target.value) }}> </Thefiltro>
    <br />
    <div className="seccion-categorias"> 
    {ciclarCategorias}
    </div>
    </>

  )
};


Thecategorias.propTypes = {
  //categorias: PropTypes.object.isRequired //nota: agregar el tema de proptypes.sharp, para entrar dentro del objeto y definir los tipos de variables
};

Thecategorias.defaultProps = {

}


export default Thecategorias



