import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from '../axios/axios';
import swal from "sweetalert2";
import { saveToLocal, remove} from "../functions/localStorage";

const Register= () => {
  remove();
  const onSubmit = () => {
      const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
      }
      if(data.email!=='' && data.password!==''){

        api.post(`/registerUser`,data).then((res)=>{
            if(res.data.state === 1){
              saveToLocal('email', data.email);
              saveToLocal('User',res.data.message['_id']);
              window.location.href="/code";
            }else if(res.data.state === 2){
              swal.fire({
                title: "Correo electrónico ya existe",
                text: "Ingrese sesión o utilice otro",
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
        swal.fire({
            title: "Error",
            text: "Por favor ingrese todos los campos",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#f96332",
          });
      }
      
  };

  return (
    <section className="container-fluid w-100">
      <div className="container d-flex container_intro_home mb-5">
        <h4 className="intro_home mt-2 text-white">
          Bienvenido a la plataforma para gestionar tus tareas diarias, puedes registrarte con tú correo electrónico y una contraseña, ten en cuenta que se te contactará por el correo que proporciones. 
        </h4>
      </div>

      <Card
        style={{ width: "25rem" }}
        className="col-8 mx-auto mt-2 mb-5 container-fluid"
      >
        <Card.Title className="mt-3 mx-auto">Crea un usuario</Card.Title>
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
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="m-auto">
                <Button variant="primary" onClick={onSubmit}>
                Crear
                </Button>
              </a>
              <a href="/" className="m-auto">
                <Button variant="danger">
                  Iniciar sesión
                </Button>
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Register;
