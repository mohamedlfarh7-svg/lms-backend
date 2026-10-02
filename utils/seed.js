const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Resource = require('../models/Resource');

dotenv.config();
const seedData = async () =>{
try{
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db');

    await Course.deleteMany();
    await Module.deleteMany();
    await Resource.deleteMany();

    const course1 = await Course.create({
    title: 'Développement Backend avec Node.js & Express',
    shortDescription: 'Apprenez à construire une API REST complète et sécurisée.',
    detailedDescription: 'Un cours complet couvrant Express, Mongoose, Docker et des projets pratiques.',
    level: 'intermediate',
    category: 'Web Development',
    estimatedDuration: 20,
    isPublished: true,
    });

    const module1 = await Module.create({
    title: 'Introduction et Structure d Express',
    description: 'Configuration du serveur et gestion des routes.',
    order: 1,
    estimatedDuration: 120,
    course: course1._id,
    });

    await Resource.create({
    title: 'Guide d installation de Node.js',
    type: 'article',
    url: 'https://nodejs.org/docs',
    order: 1,
    module: module1._id,
    });
    console.log('Base de données alimentée avec succès !');
    process.exit();
}catch(error) {
    console.error(`Erreur lors du seeding : ${error.message}`);
    process.exit(1);
}

}

seedData();
