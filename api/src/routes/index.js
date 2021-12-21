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
        let { id, name, released, rating, platforms } = e;
        return { id, name, released, rating, platforms };
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
        let { id, name, released, rating, platforms } = e;
        return { id, name, released, rating, platforms };
    })
    return resultApi;
}

const getSearchNameDb = async (n) => {
    return [];
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
    res.send(result);
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

module.exports = router;
