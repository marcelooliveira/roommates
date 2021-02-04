import { data as roomData } from '../../../data/data.js';
import getDB from '../../../data/getDB.js';

export default async (req, res) => {
  getDB(loadHandler);
  
  function loadHandler(db) {
    db.loadDatabase();
    
    var rooms = db.getCollection('rooms');

    if (rooms === null) {
      res.status(404).end(`rooms collection Not Found`);
      return;
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json(rooms.data);
  }
};