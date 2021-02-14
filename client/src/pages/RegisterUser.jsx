import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Register from '../components/Register';
import Fondo from "../images/fondo.jpg"


export default function RegisterUser(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <Register/>
            <br/>
            <Footer/>
        </section>
    )
}