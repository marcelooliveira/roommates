import loki from 'lokijs';
import { data as roomData } from '../../../data/data.js';

export default async (req, res) => {

  var db = new loki('roommates.db', 
    {
      autoload: true,
      autoloadCallback : loadHandler,
      autosave: true, 
      autosaveInterval: 10000 // 10 seconds
    });

  function loadHandler() {
    // if database did not exist it will be empty so I will intitialize here
    var rooms = db.getCollection('rooms');

    if (rooms === null) {
      rooms = db.addCollection('rooms');
      try {
        // roomData.forEach(room => {
          rooms.insert(roomData);
          // db.saveDatabase();
        // });
      } catch (error) {               
      }
    }
    res.status(200).json(rooms.data);
  }
};