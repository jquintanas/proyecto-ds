# Proyecto Sistemas Distribuidos

El proyecto consiste en realizar pruebas de stress usando locust y un back end realizado en nodejs para la materia de ing de software.

## Instalación

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install locust
pip install -e git://github.com/locustio/locust.git@master#egg=locust
```
Se recomienda hacer la instalación en un virtual env de python para evitar errores.
## Uso
Inicie el proyecto de node ubicado en la carpeta /api
```nodejs
cd api
npm i
npm run build
npm start
```
Diseño de test
```python
from locust import HttpUser, task, between
class WebsiteTestUser(HttpUser):
    wait_time = between(0.5, 3.0)

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        pass

    @task(1)
    def hello_world(self):
        self.client.post("/api/login/usuario", json={"email":"mail@mail.com", "clave":"12345678"})
```
Lanzar el test
```bash
locust -f locoustfile.py
```
Este comando generara un servidor desde el cual se puede configurar los datos de la prueba.

Cantidad de usuarios simulados.

Host de prueba.


## License
[MIT](https://choosealicense.com/licenses/mit/)