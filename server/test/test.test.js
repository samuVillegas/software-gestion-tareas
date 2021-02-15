const request = require('supertest');
const faker = require('faker');
const app = require('../index');



describe("Se quieren probar los servicios que involucran los usuarios",()=>{
    it('Verificar que el registro de usuarios funciona', async()=>{
        const res = await request(app)
            .post('/registerUser')
            .send({
                email:faker.internet.email(),
                password:faker.internet.password()
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('state',1)
    });

    it('Verificar que me sale error cuando intento registrarme con un correo ya inscrito', async()=>{
        const res = await request(app)
            .post('/registerUser')
            .send({
                email:"villegassamuel25@gmail.com",
                password:faker.internet.password()
            })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('state',2)
    });


    it('Verificar que un usuario cumple con las credenciales para iniciar sesión', async()=>{
        const res = await request(app)
            .post('/login')
            .send({
                email:"villegassamuel25@gmail.com",
                password:"Samu1732@"
            })
            expect(res.body).toHaveProperty('state',1)
            expect(res.statusCode).toEqual(201)   
    });
    it('Verificar que un usuario no cumple con las credenciales para iniciar sesión por no tener correo registrado', async()=>{
        const res = await request(app)
            .post('/login')
            .send({
                email:faker.internet.email(),
                password:faker.internet.password()
            })
            expect(res.body).toHaveProperty('state',2)
            expect(res.statusCode).toEqual(200)   
    });

    it('Verificar que un usuario no cumple con las credenciales para iniciar sesión por contraseña incorrecta', async()=>{
        const res = await request(app)
            .post('/login')
            .send({
                email:"villegassamuel25@gmail.com",
                password:faker.internet.password()
            })
            expect(res.body).toHaveProperty('state',3)
            expect(res.statusCode).toEqual(200)   
    });

    it('Verificar que el registro de tareas funciona', async()=>{
        const res = await request(app)
            .post('/registerTask')
            .send({
                UrlImg:faker.image.imageUrl(),
                TaskName:faker.lorem.words(),
                TaskPriority:faker.random.arrayElement(['High','Medium','Low']),
                ExpirationDate:faker.date.future(),
                User: "60282065cf07930d59b7fb4b"
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('state',1)
    });

    it('Verificar que se listan las tareas asociadas a un usuario', async()=>{
        const res = await request(app)
        .get(`/getTasks/60282065cf07930d59b7fb4b`)
        expect(res.statusCode).toEqual(200)
        expect(res.data)
    });

    it('Verificar que se borre una tarea según su id', async()=>{
        const res = await request(app)
        .delete(`/deleteTask/602aa1b4fec58554f805d696`)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('state',1)
    });

    it('Verificar que la edición de tareas funciona', async()=>{
        const res = await request(app)
            .put('/editTask')
            .send({
                _id:"602aa5ba18eb365edcb33fa8",
                UrlImg:faker.image.imageUrl(),
                TaskName:faker.lorem.words(),
                TaskPriority:faker.random.arrayElement(['High','Medium','Low']),
                ExpirationDate:faker.date.future(),
                User: "60282065cf07930d59b7fb4b"
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('state',1)
    });
})