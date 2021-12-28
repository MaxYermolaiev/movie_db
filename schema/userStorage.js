const {Schema,ObjectId,model} = require("mongoose")

const userStorage = new Schema({

genres: {type: Array,default: ["Data not provided"]},
homepage: {type: String,default: "Data not provided"},
id: {type: Number,required: true},
imdb_id: {type: String,default: "Data not provided"},
original_language: {type: String,default: "Data not provided"},
original_title: {type: String,default: "Data not provided"},
overview: {type: String,String: "Data not provided"},
popularity: {type: Number,default: 0},
poster_path: {type: String,String: "Data not provided"},
production_companies: {type: Array,default: ["Data not provided"]},
production_countries: {type: Array,default: ["Data not provided"]},
release_date: {type: String,default: "Data not provided"},
revenue: {type: Number,default: 0},
runtime: {type: Number,default: 0},
spoken_languages: {type: Array,default: ["Data not provided"]},
status: {type: String,default: "Data not provided"},
tagline: {type: String,default: "Data not provided"},
title: {type: String,default: "Data not provided"},
video: {type: Boolean,default: false},
vote_average: {type: Number,default: 0},
vote_count: {type: Number,default: 0},
owner:{type: ObjectId, ref: 'User'}
})
module.exports =model("UserStorage",userStorage);