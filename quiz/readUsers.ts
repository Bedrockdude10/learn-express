import express, { Request, Response } from 'express';
import { User, UserRequest} from './types'; // Import User type

const router = express.Router();

// GET /read/usernames - Returns a list of usernames
router.get('/usernames', (req: UserRequest, res: Response) => {
    if (!req.users) return res.status(404).json({ error: 'Users not found' });
  
    const usernames = req.users.map(user => ({ id: user.id, username: user.username }));
    res.json(usernames);
  });


// GET /read/username/:name - Search for a user by username
router.get('/username/:name', (req: UserRequest, res: Response) => {
    if (!req.users) return res.status(404).json({ error: 'Users not found' });
  
    const { name } = req.params;
    const user = req.users.find(user => user.username === name);
  
    res.json(user ? [{ id: user.id, email: user.email }] : [{ id: 'error', email: 'Not Found' }]);
  });

export default router;
