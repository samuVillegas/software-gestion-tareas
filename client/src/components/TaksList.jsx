import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import DateFnsUtils from "@date-io/date-fns";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import api from "../axios/axios";
import swal from "sweetalert2";

import { saveToLocal, getFromLocal, remove } from "../functions/localStorage";

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const TaskList = () => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedPriority, handlePriorityChange] = useState("Low");
  const [fileImg, setFileImg] = useState("");
  const [imgname, setImgname] = useState("");
  const [infoTasks, setInfoTasks] = useState([]);

  useEffect(() => {
    seeTasks();
  }, []);

  function seeTasks() {
    const User = getFromLocal("User");
    if (User) {
      api
        .get(`/getTasks/${User}`)
        .then((res) => {
          setInfoTasks(res.data);
        })
        .catch((err) => {});
    }
  }

  const exit = ()=>{
    remove()
    window.location.href="/";
  }

  const onClick = async () => {
    const taskName = document.querySelector("#name").value;
    if (taskName !== "" && fileImg !== "" && imgname !== "") {
      const formData = new FormData();
      formData.append("img", fileImg, imgname);

      await api
        .post("/sendImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          if (res.data.state === 1) {
            const data = {
              UrlImg: `./uploads/${res.data.message.filename}`,
              TaskName: taskName,
              TaskPriority: selectedPriority,
              ExpirationDate: selectedDate,
              User: getFromLocal("User"),
            };

            await api
              .post("/registerTask", data)
              .then((res) => {
                seeTasks();
                handleClose();
              })
              .catch((err) => {
                swal.fire({
                  title: "Error 500",
                  text: "Por favor reintente o vuelva después",
                  icon: "error",
                  confirmButtonText: "¡Entendido!",
                  confirmButtonColor: "#f96332",
                });
              });
          } else if (res.data.state === 0) {
            swal.fire({
              title: "Error 500",
              text: "Por favor reintente o vuelva después",
              icon: "error",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#f96332",
            });
          }
        })
        .catch((err) => {
          swal.fire({
            title: "Error 500",
            text: "Por favor reintente o vuelva después",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#f96332",
          });
        });
    }
  };

  return (
    <section className="container-fluid w-100">
      <Card className="mx-auto my-5 p-5" style={{ width: "75vw" }}>
        <div className="mb-2">
          <Button variant="danger" size="lg" onClick={exit}>
            Salir
          </Button>
        </div>
        <div className="mb-2">
          <Button variant="primary" size="lg" onClick={handleShow}>
            Añadir tarea
          </Button>
        </div>
        <div className="mb-5 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>     
                <th scope="col">Prioridad</th> 
              </tr>
            </thead>
            <tbody>
              {infoTasks.map((info) => (
                <tr key={info['_id']} className="notasXEstudiante" id={info['_id']}>
                  <td>{info.TaskName}</td>  
                  <td>{info.TaskPriority==='High'?'Alta':info.TaskPriority==='Medium'?'Media':'Baja'}</td> 
                  <td>
                    <Button
                      variant="primary"
                      className="btn btn-info">
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="btn btn-info">
                      Imagen
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={()=>{
                        

                      }}
                      className="btn btn-info"
                      >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Añadir tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Ingresa el nombre de la tarea"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de vencimiento</Form.Label>
                <br></br>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Form.Group>
              <Form.Group>
                <Form.Label>Prioridad</Form.Label>
                <br></br>
                <ButtonGroup>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handlePriorityChange("High");
                    }}
                  >
                    Alta
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      handlePriorityChange("Medium");
                    }}
                  >
                    Media
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handlePriorityChange("Low");
                    }}
                  >
                    Baja
                  </Button>
                </ButtonGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Subir imagen</Form.Label>
                <Form.File
                  onChange={(e) => {
                    setFileImg(e.target.files[0]);
                    setImgname(e.target.files[0].name);
                  }}
                  accept=".jpeg,.jpg,.png"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="warning" onClick={onClick}>
              Añadir
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </section>
  );
};

export default TaskList;
