import React , {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
//import './Pendon.css'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Categorias } from '../Data/DataServicios';

function Editable() {
    //data
   
    const [data, setData] = useState([ ]);
    const [categoriasOpciones, setcategoriasOpciones] = useState({'61ab906e55d08fb89fd9fe70': 'TÉCNICOS', "161ab903755d08fb89fd9fe6d": 'TUTORES', '61ab90ac55d08fb89fd9fe73': 'ENTRENADORES', '': 'DEPORTISTAS'}) //reasignamos para meter el objeto en la tabla 'lookup'
    

    useEffect(() => {
        listarProveedores() ;

        listarCategorias()

        }, []);
   
      const listarCategorias= async ()=>{
       // e.preventDefault()
        const status={}
        await Axios.get('/categoria/listActivos').then(response=>{
          response.data.map(item => status[item._id] = item.nombre ) 
          setcategoriasOpciones(status)
          console.log('final')
          console.log(categoriasOpciones)
          console.log(response.data)
        }
        )
        
        
      }
      //peticion GET, listamos proveedores
      const listarProveedores= async()=>{ 
        // const token = sessionStorage.getItem('token') para la Auth
        const respuesta = await Axios.get('/proveedores/listTodo').then(response=>{
          setData(response.data)
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
  
  
    const [columns] = useState([
        // eslint-disable-next-line jsx-a11y/alt-text
      { title: 'FOTOGRAFÍA', field: 'foto', render: rowData => <img src={rowData.foto} style={{width: 40, borderRadius: '50%'}}/>,
      validate:rowData=>{
        if(rowData.foto===undefined || rowData.foto===""){
        return"*Obligatorio"
      }else if (rowData.foto.length<10){
        return "Escriba una URL valida"
      }
      return true
    }},
    { title: 'CEDULA', field: 'cedula', validate:rowData=>{
        if(rowData.cedula===undefined || rowData.cedula===""){
        return"*Obligatorio"
      }else if (rowData.cedula.length<5){
        return "Escriba el cedula completa del proveedor"
      }
      return true
    }},
      { title: 'NOMBRE', field: 'nombre', validate:rowData=>{
          if(rowData.nombre===undefined || rowData.nombre===""){
          return"*Obligatorio"
        }else if (rowData.nombre.length<5){
          return "Escriba el nombre completo del proveedor"
        }
        return true
      }},

      { title: 'PROFESIÓN', field: 'profesion',validate:rowData=>{
        if(rowData.profesion===undefined || rowData.profesion===""){
        return"*Obligatorio"
      }else if (rowData.profesion.length<5){
        return "Escriba su profesión"
      }
      return true
     }},
     { title: 'DESCRIPCIÓN', field: 'descripcion',initialEditValue: 'palabras claves', validate:rowData=>{
        if(rowData.descripcion===undefined || rowData.descripcion===""){
        return"*Obligatorio"
      }else if (rowData.descripcion.length<5){
        return "Escriba la descripcion completo del proveedor"
      }
      return true
    }},

     { title: 'PRECIOxHORA', field: 'precioxhora'
    //  validate:rowData=>{
    //     if (rowData.precioxhora.includes('.')){
    //     return "Escriba el precio por hora COP del servicio, sin signos"
    //   }
    //   return true}
    },

      { title: 'CALIFICACIÓN', field: 'calificacion.$numberDecimal'},
      
      {title: 'CATEGORÍA',field: 'categoria._id', lookup:categoriasOpciones
      },

      { title: 'CELULAR', field: 'celular', validate:rowData=>{
        if(rowData.celular===undefined || rowData.celular===""){
        return"*Obligatorio"
      }else if (rowData.celular.length<7){
        return "Escriba un número de telefono valido"
      }
      return true
    }},

    { title: 'CORREO', field: 'correo', validate:rowData=>{
        if(rowData.correo===undefined || rowData.correo===""){
        return"*Obligatorio"
      }else if (!rowData.correo.includes('@' && '.')){
        return "Escriba un correo electronico valido"
      }
      return true
    }},
    { title: 'PASSWORD', field: 'password', validate:rowData=>{
        if(rowData.password===undefined || rowData.password===""){
        return"*Obligatorio"
      }else if (rowData.password.length<8){
        return "Escriba el password completo del proveedor"
      }
      return true
    }},
      { title: 'CIUDAD', field: 'ciudad', lookup: { "Bogota": 'Bogota' }, validate:rowData=>{
        if(rowData.ciudad===undefined || rowData.ciudad===""){
        return"*Obligatorio"
      }else if (rowData.ciudad.length<3){
        return "Escriba el nombre de la ciudad donde reside"
      }
      return true 
    }},

    { title: 'EXPERIENCIA(Años)', field: 'experiencia',validate:rowData=>{
        if(rowData.experiencia===undefined || rowData.experiencia===""){
        return"*Obligatorio"
     }else if (rowData.experiencia.length>100){
        return "Escriba los años de experiencia laboral"
      } 
      return true 
    }},
    
    { title: 'ESTADO', field: 'estado',
    lookup: { "Activo": 'activo', "Inactivo": 'inactivo' }, 
    },
    { title: 'ROL', field: 'rol',
    initialEditValue: 'proveedor',
    lookup: { "proveedor": 'Proveedor' },

    },

    ]);

    
    return (
        <div className="container">
        <br/>
      <MaterialTable
        title="Lista de proveedores de servicios"
        columns={columns}
        data={data}
        options={{
            actionsColumnIndex:0,
            initialPage:1,
           
          }}
                  localization={{
            body: {
              editRow: {
                deleteText: '¿Estas seguro de Eliminar este registro?',
              },
            },
          }}

          editable={{

            //Peticion ADD
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                const respuesta =  Axios.post('/proveedores/add',newData)
                .then(
                  response=>{
                  console.log(response.data)
                  setTimeout(() => {
                  setData([...data, newData]);
                  resolve();   }, 1000)
                })
                .catch(error=>{
                  console.log(error.response)
                  Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 3000 })
                    resolve()
                  return error.response
                })
                
                
              }),
            //Metodo actualizar  
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                
                const actualizar =  Axios.put('/proveedores/actualizar',newData).then(
                response=>{  
                  console.log(response.data)
                  setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
    
                  resolve();
                }, 1000)
                } ).catch(error=>{
                  console.log(error.response)
                  Swal.fire({
                    icon: "error",
                    title: error.response.data.message ,
                    showConfirmButton: false,
                    timer: 6000 })
                    resolve()
                  return error.response
                })
              }
              ),
  
            //Peticion Borrar registro  
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                const index = oldData.tableData.id
                const eliminar =  Axios.delete('/proveedores/borrar',{ data:{_id:data[index]._id} }) // es necesario enviarlo adentro de un objeto 'data'
                .then(
                  response=>{
                  console.log(response.data)
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
    
                    resolve()
                  }, 1000)
                }).catch(error=>{
                  console.log(error.response)
                  Swal.fire({
                    icon: "error",
                    title: error.response.data.message + data[index]._id,
                    showConfirmButton: false,
                    timer: 6000 })
                    resolve()
                  return error.response
                })
  
                
  
  
              }),
          }}
      />
      </div>
    )
  }
export default Editable