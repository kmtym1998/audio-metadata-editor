import fs from 'fs';
import path from 'path';

export const walk = (
  dir: string,
  callback: (filepath: string, stats: fs.Stats) => void,
) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filepath = path.join(dir, file);

      fs.stat(filepath, (_, stats) => {
        if (stats.isDirectory()) {
          walk(filepath, callback);
        } else if (stats.isFile()) {
          callback(filepath, stats);
        }
      });
    });
  });
};

export const readdir = (dir: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);

      resolve(files);
    });
  });
};
