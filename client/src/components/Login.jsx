import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from '../axios/axios';
import swal from "sweetalert2";
import { saveToLocal, remove} from "../functions/localStorage";

const Login = () => {
  remove();
  const onSubmit = () => {
      const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
      }
      if(data.email!=='' && data.password!==''){

        api.post(`/login`,data).then((res)=>{
            if(res.data.state === 1){
              saveToLocal('email', data.email);
              window.location.href="/code";
            }else if(res.data.state === 3){
              swal.fire({
                title: "Contraseña inválida",
                text: "Ingrese una contraseña válida para el correo registrado",
                icon: "error",
                confirmButtonText: "¡Entendido!",
                confirmButtonColor: "#f96332",
              });
            }else if(res.data.state === 2){
              swal.fire({
                title: "Correo electrónico no existe",
                text: "Ingrese un correo registrado o cree una cuenta",
                icon: "error",
                confirmButtonText: "¡Entendido!",
                confirmButtonColor: "#f96332",
              });
            }else{
              swal.fire({
                title: "Error 500",
                text: "Por favor reintente o vuelva después",
                icon: "error",
                confirmButtonText: "¡Entendido!",
                confirmButtonColor: "#f96332",
              });
            }
        }).catch((err)=>{
          swal.fire({
            title: "Error 500",
            text: "Por favor reintente o vuelva después",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#f96332",
          });
        })

      }else{

      }
      
  };

  return (
    <section className="container-fluid w-100">
      <div className="container d-flex container_intro_home mb-5">
        <h4 className="intro_home mt-2 text-white">
          Bienvenido a la plataforma para gestionar tus tareas diarias.
        </h4>
      </div>

      <Card
        style={{ width: "25rem" }}
        className="col-8 mx-auto mt-2 mb-5 container-fluid"
      >
        <Card.Title className="mt-3 mx-auto">Inicia tu sesión</Card.Title>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control id="email" type="email" placeholder="Ingresa el correo" />
            </Form.Group>

            <Form.Group >
              <Form.Label>Contraseña</Form.Label>
              <Form.Control id="password" type="password" placeholder="Ingresa la contraseña" />
            </Form.Group>
            
            <Button variant="primary" onClick={onSubmit}>
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Login;
