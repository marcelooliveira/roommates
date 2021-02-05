import { data as roomData } from '../../../data/data.js';
import getDB from '../../../data/getDB.js';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      const roomId = req.query['id'];
      if (!roomId) {
        res.status(400).end() //Bad Request
        return;
      }

      if (parseInt(roomId) > 0) {
        getRoom(res, roomId);
        return;
      }

      getAllRooms(res);
      break
    case 'POST':
      if (!req.body.videoId) {
        res.status(400).end() //Bad Request
        return;
      }
      updateRoom(res, roomId, req.body.videoId);
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }

};

function getRoom(res, roomId) {
  getDB(loadHandler);

  function loadHandler(db) {
    db.loadDatabase();
    var rooms = db.getCollection('rooms');

    if (rooms === null) {
      res.status(404).end(`rooms collection Not Found`);
      return;
    }

    let doc = rooms.get(roomId);
    if (!doc) {
      res.status(404).end(`roomId Not Found`);
      return;
    }

    res.status(200).json(doc);
  }
}

function getAllRooms(res) {
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
}

function updateRoom(res, roomId, videoId) {
  getDB(loadHandler);
  
  function loadHandler(db) {
    db.loadDatabase();
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
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).json('videoId ' + videoId + ' updated successfully.');
  }
}