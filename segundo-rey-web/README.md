---- DOCUMENTACIÓN PÁGINA WEB ------VANESSA BEIS GUIJARRO--------------------

He creado una copia sobre la que trabajar modernizando la página creada con Wordpress mediante React+Vite trabajando con Javascript Vanilla.

- Inclusión de páginas individuales con link en barra menú (Inicio, Empresa (sobre nosotros + pilares|filosofía), Catálogo, Obras Suministradas, Contacto, Trabaja con Nosotros)
- Fijar horario tienda en parte inferior junto a dirección.
Sección Obras suministradas: Galería de imágenes con pequeña descripción de los materiales aportados y sus calidades.
- Sección Contacto: Formulario con dirección y maps.
- Sección Cita Previa: Aviso al inicio de la obligatoriedad de reservar para los sábados
    - Crear una parte privada (Login) para que los 4 vendedores puedas reservar citas entre semana, habilitar el marcado de vacaciones y la posibilidad de marcar cita entre los compañeros.


ESTILOS:

- COLORES CORPORATIVOS: #f29100, #141617,
- Tipografía: #f9f9fb, roboto condensed
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

css:
.roboto-condensed-<uniquifier> {
  font-family: "Roboto Condensed", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}

- LOGO: logo_segundo_rey.png

# PÁGINA WEB MAYO 2025 (REACT+VITE+JS)

## EXPLICACIÓN DEL PROYECTO Y SU EJECUCIÓN:

## ESTRUCTURA:

- El proyecto está estructurado en dos carpetas FRONT y BACK, la primera contiene los elementos necesarios para la correcta visualización de la página web Segundo Rey realizada este mes de mayo de 2025, la segunda contiene el server y elementos Back para la correcta llamada al servidor y base de datos.

- FRONTEND:
  - Se compone de carpeta src que contiene los assets (iconos, imágenes, logo), componentes (PRIVADA, PUBLICA), locales (3 carpetas de archivos para la traducción de la página al galego, inglés y español) y los archivos principales de llamada al resto de componentes como App.jsx, App.css, etc.

  - Componentes: se divide en componentes públicos que es la propia página web dividida en pequeños componentes de la página. Todos se llaman en el Body. La parte privada se compone de un Login y una agenda para que los vendedores puedan agendar sus citas diariamente y a sus compañeros, por ello accederán a partir de una autenticación de usuario y contraseña.

- BACKEND:
  - En el archivo server.js se realizan las llamadas y envios de información tanto a las páginas como a los componentes de las páginas como agenda, calendario, etc.
