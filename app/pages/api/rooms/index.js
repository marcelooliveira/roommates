import loki from 'lokijs';
import { data as roomData } from '../../../data/data.js';

export default async (req, res) => {
  
  var db = new loki('roommates.db', 
  {
    autoload: true,
    // autoloadCallback : loadHandler,
    autosave: true, 
    autosaveInterval: 10000 // 10 seconds
  });

  res.status(200).json(db);
  return;

  function loadHandler() {
    // if database did not exist it will be empty so I will intitialize here
    // var rooms = db.getCollection('rooms');

    // if (rooms === null) {
    //   rooms = db.addCollection('rooms');
    //   try {
    //       rooms.insert(roomData);
    //       db.saveDatabase();
    //   } catch (error) {
    //     res.status(200).json(error);
    //   }
    // }
    // res.status(200).json(rooms.data);

    res.status(200).json({
      "number": 1,
      "price": 124,
      "address": "4762  Francis Mine",
      "pic": "/img/01.jpg",
      "bedrooms": 5,
      "bathrooms": 4,
      "cars": 3,
      "owner": "marcelooliveira"
    });

  }
};