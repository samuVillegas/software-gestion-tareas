# software-gestion-tareas
Aplicación web para gestión de tareas llamada **Remember tasks**. 


Contiene un Backend donde se utilizó NodeJs con ExpresJS, también se utilizaron dependencias como: Nodemailer, cors, dotenv, multer, mongoose y uuid. 
En base de datos se utilizó MongoDB que estaba instalado tanto localmente como en la Compute Enginne de GCP. 

También contiene un Frontend donde se utilizó ReactJS utilizando dependencias como: react-boostrap, date-fns, react-router-dom, sweetalert2 y axios.

Para el testeo se utilizaron dependencias como: croos-env,faker, jest y supertest. Solo se le realizaron pruebas unitarias a los servicios realizados en el Backend. 

El despliege de la aplicación se hizo en una Compute Enginne de GCP, la cual es N1 utilizando la distribución Debian 10 de linux, se configuró la ejecución con pm2, se instalo MongoDB y se realizaron cambios en rutas para el correcto funcionamiento de la aplicación. 
