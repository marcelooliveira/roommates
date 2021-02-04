import { data as roomData } from '../../../data/data.js';
import getDB from '../../../data/getDB.js';

export default async (req, res) => {
  getDB(loadHandler);
  
  function loadHandler(db) {
    
    var rooms = db.getCollection('rooms');

    if (rooms === null) {
      rooms = db.addCollection('rooms');
      rooms.insert(roomData);
      db.saveDatabase();
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json(rooms.data);
  }
};