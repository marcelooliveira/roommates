import loki from 'lokijs';
import lfsa from 'lokijs/src/loki-fs-structured-adapter';
import { data as roomData } from '../../../data/data.js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  
  switch (req.method) {
    case 'GET':
      getRoom(res, req.query['id']);
      break
    case 'POST':
      if (!req.body.videoId) {
        res.status(400).end() //Bad Request
        return;
      }
      updateRoom(res, req.query['id'], req.body.videoId);
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
};

function getRoom(res, roomId) {
  var adapter = new lfsa();
  var db = new loki(publicRuntimeConfig.lokiDatabase,
    {
      adapter: adapter,
      autoload: true,
      autoloadCallback: loadHandler
    });

  function loadHandler() {

    var rooms = db.getCollection('rooms');

    if (rooms === null) {
      rooms = db.addCollection('rooms');
      rooms.insert(roomData);
      db.saveDatabase();
    }

    let doc = rooms.get(1);
    if (!doc) {
      res.status(404).end(`roomId Not Found`);
      return;
    }

    res.status(200).json(doc);
  }
}

function updateRoom(res, roomId, videoId) {
  var adapter = new lfsa();
  var db = new loki(publicRuntimeConfig.lokiDatabase,
  {
    adapter: adapter,
    autoload: true,
    autoloadCallback : loadHandler
  });
  
  function loadHandler() {
    var rooms = db.getCollection('rooms');
    if (!rooms) {
      res.status(500).json('rooms collection not found!');
      return;
    }

    let doc = rooms.get(roomId);
    if (!doc) {
      res.status(404).end(`roomId ${roomId} Not Found`);
      return;
    }

    doc.videoId = videoId;
    rooms.update(doc);
    db.saveDatabase();
    res.status(200).json('videoId ' + videoId + ' updated successfully.');
  }
}