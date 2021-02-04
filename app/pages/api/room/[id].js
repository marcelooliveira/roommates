import loki from 'lokijs';
import lfsa from 'lokijs/src/loki-fs-structured-adapter';
import { data as roomData } from '../../../data/data.js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  
  var adapter = new lfsa();
  var db = new loki(publicRuntimeConfig.lokiDatabase,
  {
    adapter: adapter,
    autoload: true,
    autoloadCallback : loadHandler
  });
  
  function loadHandler() {
    
    var rooms = db.getCollection('rooms');
    
    if (rooms === null) {
      rooms = db.addCollection('rooms');
      rooms.insert(roomData);
      db.saveDatabase();
    }

    var result = rooms.get(1);

    res.status(200).json(result.data);
  }
};