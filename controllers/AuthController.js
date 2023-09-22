import { v4 as uuidv4 } from 'uuid';
import clientRedis from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    await clientRedis.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    await clientRedis.del(`auth_${token}`);
    res.status(204).send();
  }
}
