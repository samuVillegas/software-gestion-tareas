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
  const [show2, setShow2] = useState(false);
  const [show3,setShow3] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedPriority, handlePriorityChange] = useState("Low");
  const [fileImg, setFileImg] = useState("");
  const [imgname, setImgname] = useState("");
  const [infoTasks, setInfoTasks] = useState([]);
  const [imgModal, setImgModal] = useState("");
  const [idEdit,setIdEdit] = useState('');


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

  const exit = () => {
    remove();
    window.location.href = "/";
  };

  const createTask = () => {
    const taskName = document.querySelector("#name").value;
    if (taskName !== "" && fileImg !== "" && imgname !== "" && selectedPriority!=='') {
      const formData = new FormData();
      formData.append("img", fileImg, imgname);

      api
        .post("/sendImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.state === 1) {
            selectedDate.setHours(selectedDate.getHours() - 5);
            const data = {
              UrlImg: `./uploads/${res.data.message.filename}`,
              TaskName: taskName,
              TaskPriority: selectedPriority,
              ExpirationDate: selectedDate,
              User: getFromLocal("User"),
            };

            api
              .post("/registerTask", data)
              .then((res) => {
                seeTasks();
                const taskName = document.querySelector("#name").value = '';
                handlePriorityChange('Low');
                handleDateChange(new Date());
                setFileImg('');
                setImgname('');
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

  const editTask = ()=>{
    const taskName = document.querySelector("#nameEdit").value;
    if (taskName !== "" && fileImg !== "" && imgname !== ""  && selectedPriority!=='') {
      const formData = new FormData();
      formData.append("img", fileImg, imgname);

      api
        .post("/sendImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.state === 1) {
            selectedDate.setHours(selectedDate.getHours() - 5);
            const data = {
              _id:idEdit,
              UrlImg: `./uploads/${res.data.message.filename}`,
              TaskName: taskName,
              TaskPriority: selectedPriority,
              ExpirationDate: selectedDate,
              User: getFromLocal("User"),
            };

            api
              .put("/editTask", data)
              .then((res) => {
                seeTasks();
                const taskName = document.querySelector("#nameEdit").value = '';
                handlePriorityChange('Low');
                handleDateChange(new Date());
                setFileImg('');
                setImgname('');
                handleClose3();
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
    }else{
      swal.fire({
        title: "Error",
        text: "Por favor ingrese todos los campos",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f96332",
      });
    }
  }

  const testDate = (date)=>{
    console.log(date.split('T')[0].split('-')[0] +" " +date.split('T')[0].split('-')[1]+" "+date.split('T')[0].split('-')[2])
    const dateTask = new Date(date.split('T')[0].split('-')[0],"0"+(Number(date.split('T')[0].split('-')[1])-1),date.split('T')[0].split('-')[2]);
    const Today = new Date();


    if(Today<dateTask)return true;
    else return false;
  }

  return (
    <section className="container-fluid w-100">
      <Card className="mx-auto my-5 p-5" style={{ width: "75vw" }}>
        <div className="mb-2">
          <Button id="botonsalir" variant="danger" size="lg" onClick={exit}>
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
                <th scope="col">Fecha</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {infoTasks.map((info) => (
                <tr
                  key={info["_id"]}
                  className="notasXEstudiante"
                  id={info["_id"]}
                >
                  <td>{info.TaskName}</td>
                  <td>
                    {"Día: " +
                      info.ExpirationDate.split("T")[0] +
                      " Hora: " +
                      info.ExpirationDate.split("T")[1].split(".")[0]}
                  </td>
                  <td>
                    {info.TaskPriority === "High"
                      ? "Alta"
                      : info.TaskPriority === "Medium"
                      ? "Media"
                      : "Baja"}
                  </td>
                  <td>{info.ExpirationDate.split('T')[0] === new Date().toISOString().split('T')[0]?
                  <Button variant="outline-danger" disabled>Alerta</Button>:
                  testDate(info.ExpirationDate)?<Button variant="outline-success">A tiempo</Button>:<Button variant="outline-dark">Vencida</Button>}</td>
                  <td>
                    <Button variant="primary" className="btn btn-info" onClick={()=>{
                      setIdEdit(info["_id"]);
                      handleShow3();
                    }}>
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      backdrop="static"
                      keyboard={false}
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Imagen</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Image id="imgmodal" src={`${imgModal}`} fluid />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                          Cerrar
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Button
                      variant="warning"
                      className="btn btn-info"
                      onClick={() => {
                        setImgModal(info.UrlImg);
                        handleShow2();
                      }}
                    >
                      Imagen
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn btn-info"
                      onClick={() => {
                        const id = info["_id"];
                        api
                          .delete(`/deleteTask/${id}`)
                          .then((res) => {
                            if (res.data.state !== 0) {
                              seeTasks();
                              swal.fire({
                                title: "Tarea eliminada",
                                icon: "success",
                                confirmButtonText: "¡Entendido!",
                                confirmButtonColor: "#f96332",
                              });
                            } else {
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
                      }}
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
                    id="btn1"
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
            <Button variant="warning" onClick={createTask}>
              Añadir
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  id="nameEdit"
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
            <Button variant="secondary" onClick={handleClose3}>
              Cerrar
            </Button>
            <Button variant="warning" onClick={editTask}>
              Editar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </section>
  );
};

export default TaskList;
