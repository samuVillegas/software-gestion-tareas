import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Task from '../components/TaksList';
import Fondo from "../images/fondo.jpg"


export default function Home(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <Task/>
            <br/>
            <Footer/>
        </section>
    )
}