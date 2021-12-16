import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className='text-dark py-4 bg-light'>
                <div className='container'>
                    <nav className='row'>
                        <Link to='/' className='col-12 col-md-3 d-flex align-items-center justify-content-center'>
                            <img src="./logo2.png" className='mx-2' alt="" />
                        </Link>
                        <ul className='col-12 col-md-3 list-unstyled'>
                            <li className='font-weight-bold mb-2 text-center'>Iservi</li>
                            <li className='text-center'>Plataforma Web que conecta clientes que deseen soluciones y servicios en su hogar o negocio, con proveedores de servicios que den respuesta a la demanda solicitada por los clientes, todo realizado de manera ágil, confiable y segura.</li>
                        </ul>
                        <ul className='col-12 col-md-3 list-unstyled'>
                            <li className='font-weight-bold mb-2 text-center'>Enlaces</li>
                            <li className='text-center'>
                                <Link to='/Home' className='text-reset'>Home</Link>
                            </li>
                           <li className='text-center'>
                                <Link to='/Servicios' className='text-reset'>Servicios</Link>
                            </li>
                            <li className='text-center'>
                                <Link to='/Noticias' className='text-reset'>Noticias</Link>
                            </li>
                            <li className='text-center'>
                                <Link to='/Equipo' className='text-reset'>Equipo</Link>
                            </li>
                            <li className='text-center'>
                                <Link to='/Nosotros' className='text-reset'>Nosotros</Link>
                            </li>
                        </ul>
                        <ul className='col-12 col-md-3 list-unstyled'>
                            <li className='font-weight-bold mb-2 text-center'>Nos Puedes Seguir en</li>
                            <li className='d-flex justify-content-between'>
                            <i className="bi bi-facebook"/>
                            <i className="bi bi-instagram"/>
                            <i className="bi bi-twitter"/>
                            <i className="bi bi-github"/>
                            <i className="bi bi-youtube"/>
                            </li>
                        </ul>
                        <hr class="my-2"/>
                        <div className='bg-light text-dark'>
                            <p className='text-center'>Iservi © 2021. Todos los Derechos Reservados.</p>
                        </div>
                    </nav>
                    
                </div>
               
                
            </footer>
        </div>
    )
}
