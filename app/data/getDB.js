import loki from 'lokijs';
import lfsa from 'lokijs/src/loki-fs-structured-adapter';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function getDB(loadHandler) {
  var adapter = new lfsa();
  return new loki(publicRuntimeConfig.lokiDatabase,
  {
    adapter: adapter,
    autoload: true,
    autoloadCallback : loadHandler
  });
}