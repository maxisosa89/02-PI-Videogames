const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
    YOUR_API_KEY,
  } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    let url = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;
    let apiInfo = [];
    while (apiInfo.length < 100){
        let auxiliar = await axios.get(url);
        url = auxiliar.data.next;
        for (let i = 0; i < auxiliar.data.results.length; i++){
            apiInfo.push(auxiliar.data.results[i]);
        }
    }
    apiInfo = apiInfo.map(e => {
        let { id, name, released, rating, platforms, background_image, genres } = e;
        return { id, name, released, rating, platforms, background_image, genres };
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

const getSearchNameApi = async (n) => {
    let resultApi = await axios.get(`https://api.rawg.io/api/games?search=${n}&key=${YOUR_API_KEY}`);
    resultApi = resultApi.data.results.map(e => {
        let { id, name, released, rating, platforms, background_image, genres } = e;
        return { id, name, released, rating, platforms, background_image, genres };
    })
    return resultApi;
}

const getSearchNameDb = async (n) => {
    let allDb = await Videogame.findAll();
    const result = await allDb.filter(e => e.name.toLowerCase().includes(n.toLowerCase()));
    return result;
}

const getAllSearchName = async (n) => {
    const apiSearch = await getSearchNameApi(n);
    const dbSearch = await getSearchNameDb(n);
    const searchTotal = dbSearch.concat(apiSearch);
    return searchTotal;
}

const getGenres = async () => {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
    genres = await genres.data.results.map(e => {
        let { id, name } = e;
        return { id, name };
    })
    return genres;
}



router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    let result;
    if (!name){
        result = await getAllVideogames();
    } else {
        result = await getAllSearchName(name);
    }
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send("Videogame not found")
    }
})

router.get('/videogames/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    if (!isNaN(idVideogame)){
        const videogameIdUrl = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);
        const { name, released, rating, platforms, background_image, genres, description } = videogameIdUrl.data;
        const videogameIdInfo = { idVideogame, name, released, rating, platforms, background_image, genres, description }
        res.send(videogameIdInfo)
    } else {
        const videogameIdBd = await Videogame.findByPk(idVideogame, {
            include: 
            {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
            }});
        res.send(videogameIdBd);
    } 
})

router.get('/genres', async (req, res) => {
    let resultGenres = await Genre.findAll();
    if (resultGenres.length === 0){
        const createGenres = await getGenres();
        createGenres.forEach(e => {
            let { name, id } = e
            Genre.create({
                id, name
            })
        });
        resultGenres = await Genre.findAll();
    }
    res.send(resultGenres);
})

router.post('/videogame', async (req, res) => {
    /* { 
        "name": "Maxi",
        "description": "Description sarasa",
        "released": "18-12-1989",
        "rating": "5",
        "platforms": ["PC"],
        "background_image": "url de imagen",
        "genres": ["Action", "RPG"]
    } */
    const { name, description, released, rating, platforms, background_image, genres } = req.body;
    let gameCreate = await Videogame.create({name, description, released, rating, platforms, background_image});
    let genreCreate = await Genre.findAll({
        where: {name: genres}
    })
    gameCreate.addGenre(genreCreate);
    res.send("Videogame create");
})

module.exports = router;