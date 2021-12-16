import React, {useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navegacion from './components/Navegacion';
import Login from './components/Login';
import Pendon from './components/Pendon';
import SupBarra from './components/SupBarra';
import RegistroProv from './components/RegistroProv';
import ViewLogin from './components/ViewLogin';
import Thecategorias from './componentesServicios/Thecategorias';
import ServiciosOfertados from './componentesServicios/ServiciosOfertados';
import { Categorias } from './Data/DataServicios';
import VerCategorias from './componentesServicios/VerCategorias';
import VerProveedores from './componentesServicios/VerProveedores';
import LoginUsuario from './componentesUsuarios/LoginUsuario';
import RegistrarUsuario from './componentesUsuarios/RegistrarUsuario';
import nosotros from './components/nosotros';
function App() {
  const categorias = Categorias()
  const [nombreCategoria, setnombreCategoria] = useState()
  console.log(nombreCategoria)
  const handleCategorias = (index)=>{
    setnombreCategoria(categorias[index].nombre)
      }

  return (
    <Router>
      <SupBarra/>
      <Pendon/>
      <Route path='/Login' exact component={Login}/>
      <br/>
      <Route path='/RegistroProv' exact component={RegistroProv}/>
      <br/>
      <Route path='/ViewLogin' exact component={ViewLogin}/>
      <br/>
      <br/>
      {/* <Route path='/RegistrarUsuario' exact component={RegistrarUsuario}/> */}
      <Route path='/LoginUsuario' exact component={LoginUsuario}/>
      <Route path='/RegistrarUsuario' exact component={RegistrarUsuario}/>
      <Route path='/nosotros' exact component={nosotros}/>
      <Route exact path="/">

      <Thecategorias onClick={(index)=>handleCategorias(index)}/>
      </Route>
      <Route path= "/servicios">
      <div className="seccion-servicios"> 
      <ServiciosOfertados nombreCategoria={nombreCategoria}  />
      </div>
      </Route>

      <Route path= "/vercategorias">
      <VerCategorias  />
      </Route>
      <Route path= "/verproveedores">
      <VerProveedores  />
      </Route>

      <Footer/>
    
    </Router>
  );
}

export default App;
