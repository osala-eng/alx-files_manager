import client from '../utils/redis';
import clientDb from '../utils/db';

export default class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: client.isAlive(),
      db: clientDb.isAlive(),
    });
  }

  static getStats(req, res) {
    Promise.all([clientDb.nbUsers(), clientDb.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
