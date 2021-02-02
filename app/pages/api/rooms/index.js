import loki from 'lokijs';
import lfsa from 'lokijs/src/loki-fs-structured-adapter';
import { data as roomData } from '../../../data/data.js';

export default async (req, res) => {
  
  var adapter = new lfsa();
  var db = new loki('/tmp/roommates.json',
  {
    adapter: adapter,
    autoload: true,
    autoloadCallback : loadHandler
  });
  
  // db = new loki('/tmp/roommates.json', 
  // {
  //   adapter: adapter,
  //   autoload: true,
  //   autoloadCallback : loadHandler,
  //   autosave: true, 
  //   autosaveInterval: 10000 // 10 seconds
  // });

  function loadHandler() {
    
    // if database did not exist it will be empty so I will intitialize here

    var rooms = db.getCollection('rooms');
    
    if (rooms === null) {
      rooms = db.addCollection('rooms');
      rooms.insert(roomData);
      db.saveDatabase();
    }
    res.status(200).json(rooms.data);
  }
};