# Event Management Platform

## 1 Instalación

### Clonación del proyecto e instalación de dependencias

```bash
# Clonación del proyecto
git clone 

# Ingresar a las carpetas del proyecto
cd event-management-backend
cd event-management-frontend

# Ejecutar en "event-management-backend"
npm install

# Ejecutar en "event-management-frontend"
npm install
```

## 2 Archivos de configuración.

### En event-management-backend

```bash

# Copiar las variables de entorno en el archivo .env
cp .env.sample .env

```

### En event-management-frontend

```bash
# En el archivo consttants.ts colocar la ruta del backend
src/config/constants.js
# example: 
baseUrl: `http://localhost:3000`

```
## 3 Ejecutar Seeds.

```bash
# Ejecutar seeds para datos semilla
npm run seeds
```

## 4 Ejecutar aplicacion.

### En event-management-backend

```bash
#Inicar backend
npm run dev
```

### event-management-frontend

```bash
#Inicar frontend
npm run start
```

## 5 Inicio de Sesión

```bash
#Iniciar como ADMINISTRADOR
email juan@gmail.com 
password 123
```

```bash
#Iniciar como USUARIO
email maria@gmail.com
password 123
```