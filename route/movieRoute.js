const {Router} = require('express')
const router = Router()
const middleware = require("../middleware/authChecking")
const userStorage = require("../schema/userStorage")

class MovieRoute {
    async remove(req, res) {
        try {
            const {userID:id}=req.credential;
            const {movie} = req.body;
            if (!movie&&!id) {return res.status(400).json({errors: 'movie_id was not provided'})}
            const existCollection=await userStorage.findOne({movies:movie,owner:id});
            if(existCollection){
                await userStorage.findOneAndDelete({movies:movie,owner:id});
                return res.status(200).json({id:movie.id})
            }
            return res.status(404).json({errors:"Missded data on server to delete one"})
        } catch (e) {
            return res.status(500).json({errors: 'server side error'})
        }
    }

    async get(req, res) {
        try {
            const {userID:id}=req.credential;
            if (!id) {return res.status(400).json({errors: 'movie_id was not provided'})}
            let UserStorage=await userStorage.find({owner:id})
            console.log(UserStorage)
            if(UserStorage){
                return res.status(200).json({UserStorage})
            }
            return res.status(404).json({errors:"List of movie empty"})
        } catch (e) {
            return res.status(500).json({errors: 'server side error'})
        }
    }

    async add(req, res) {
        try {
            const {userID:id}=req.credential;
            const {movie} = req.body;
            if (!movie&&!id) {return res.status(400).json({errors: 'Movie data was not provided'})}
            let existCollection=await userStorage.findOne({id:movie.id,owner:id});
            if(existCollection){
                return res.json({errors:"movie already in favorite"})
            }
            if(existCollection===null){
                const data = await new userStorage({...movie,owner:id})
                await data.save()
                return res.status(201).json({id:movie.id})
            }
        } catch (e) {
            return res.status(500).json({errors: 'server side error'})
        }
    }
}

const movieRoute = new MovieRoute()
router.post("/remove-favorite",middleware,movieRoute.remove)
router.post("/add-favorite",middleware, movieRoute.add)
router.get("/get-favorite",middleware, movieRoute.get)
module.exports = router;




