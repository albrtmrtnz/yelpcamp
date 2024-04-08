const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65e282896bc9529516289fd3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor amet consectetur adipisicing elit. Repellat, dolorem, harum adipisci culpa doloremque fugit voluptatem itaque officia veritatis eveniet ut sit accusantium unde at nobis. Ad quibusdam nemo natus!',
            price,
            geometry: {
                type: "Point",
                coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsqyfhg0h/image/upload/v1711587335/YelpCamp/pxruzq9xcxnjygknnulw.jpg',
                    filename: 'YelpCamp/pxruzq9xcxnjygknnulw'
                },
                {
                    url: 'https://res.cloudinary.com/dsqyfhg0h/image/upload/v1711417271/YelpCamp/zjpcef3i9m2lkw74rmph.jpg',
                    filename: 'YelpCamp/zjpcef3i9m2lkw74rmph'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})