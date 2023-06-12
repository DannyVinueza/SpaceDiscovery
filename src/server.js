const express = require('express')
const path = require('path');
const { engine } = require('express-handlebars')
const axios = require('axios');

// Inicializaciones
const app = express()

// Configuraciones
app.set('port', process.env.port || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({ extended: false }))

//Variables globales

//Rutas
app.get("/", (req, res) => {
  res.render("index")
})

app.get('/noticias', async (req, res) => {
  try {
    // Realizar una solicitud a la API de Spaceflight News
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');

    // Obtener los datos de los artículos de la respuesta
    const articles = response.data;
console.log(articles);
    res.render('news', { articles });
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.render('error'); // Renderizar una plantilla de error en caso de fallo
  }
});

app.get('/blogs', async (req, res) => {
  try {
    // Realizar una solicitud a la API de Spaceflight News para obtener blogs
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/blogs');

    // Obtener los datos de los blogs de la respuesta
    const blogs = response.data;

    res.render('blogs', { blogs });
  } catch (error) {
    console.error('Error al obtener blogs:', error);
    res.render('error'); // Renderizar una plantilla de error en caso de fallo
  }
});

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app