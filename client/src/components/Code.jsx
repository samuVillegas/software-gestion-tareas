import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from "../axios/axios";
import swal from "sweetalert2";
import { saveToLocal, getFromLocal } from "../functions/localStorage";

const Codigo = () => {
  const [code, setCode] = useState(generateCode());
  useEffect(() => {
    sendCode();
  }, []);

  function generateCode() {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
  }

  function sendCode() {
    const data = {
      email: getFromLocal("email"),
      code: code,
    };
    api
      .post("/sendCode", data)
      .then((res) => {
        if (res.data.state === 0) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/";
      });
  }

  const onSubmit = () => {
    const userCode = document.querySelector("#code").value;
    if (userCode == code) {
      window.location.href = "/TaskList";
    } else {
      swal.fire({
        title: "Código incorrecto",
        text: "Ingrese el código enviado al correo",
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
          Ingresa el código enviado al correo {getFromLocal("email")}
        </h4>
      </div>

      <Card
        style={{ width: "25rem" }}
        className="col-8 mx-auto mt-2 mb-5 container-fluid"
      >
        <Card.Title className="mt-3 mx-auto">Inicia tu sesión</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Código</Form.Label>
              <Form.Control
                id="code"
                type="number"
                placeholder="Ingresa el código"
              />
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="m-auto">
                <Button onClick={onSubmit} variant="primary">
                  Confirmar
                </Button>
              </a>
              <a href="/" className="m-auto">
                <Button variant="danger">
                  Cancelar
                </Button>
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Codigo;
