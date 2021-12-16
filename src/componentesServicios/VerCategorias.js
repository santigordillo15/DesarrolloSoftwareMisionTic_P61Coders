import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table';
import Axios from 'axios'
import Swal from 'sweetalert2'



export default function Editable() {
    // const { useState } = React;
    const [data,setData] = useState([]) //data = 'categorias'
    console.log(data)

    //useEffect
    useEffect(() => {
    listarCategorias()   }, [])

  //peticion GET, listamos categorias
  const listarCategorias= async()=>{ 
  //const token = sessionStorage.getItem('token') 
    const respuesta = await Axios.get('/categoria/listTodo').then(response=>{
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



    const [columns, setColumns] = useState([
      { title: 'Codigo', field: 'codigo', initialEditValue: 'solo numeros' },
      { title: 'Nombre', field: 'nombre', initialEditValue: 'Poner en MAYUS' },
      { title: 'Descripcion', field: 'descripcion', initialEditValue: 'palabras claves' },
      { title: 'Foto', field: 'foto' },
      {
        title: 'Estado',
        field: 'estado',
        lookup: { "Activo": 'activo', "Inactivo": 'inactivo' },
      },
    ]);
    // const prueba = categorias.map((categoria) => ({
    //     foto: categoria.foto,
    //     nombre: categoria.nombre,
    //     descripcion: categoria.descripcion,
    //     estado: categoria.estado
    //    } ) 
  
    return (
      <MaterialTable
      options={{
        filtering: true
      }}
        title="CRUD CATEGORIAS"
        columns={columns}
        data={data}
        editable={{

          //Peticion ADD categorias
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const respuesta =  Axios.post('/categoria/add',newData)
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
              
              const actualizar =  Axios.put('/categoria/actualizar',newData).then(
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
              const eliminar =  Axios.delete('/categoria/borrar',{ data:{_id:data[index]._id} }) // es necesario enviarlo adentro de un objeto 'data'
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
    )
  }
  
