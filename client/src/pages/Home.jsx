import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo.jpg"


export default function Home(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <h1>Hola mundo</h1>
            <br/>
            <Footer/>
        </section>
    )
}