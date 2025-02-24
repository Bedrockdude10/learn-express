import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types'; // Import UserRequest

const router = express.Router()

// POST /write/adduser - Adds a new user
router.post('/adduser', async (req: UserRequest, res: Response) => {
    try {
      if (!req.users) return res.status(404).json({ error: 'Users not found' });
  
      const newUser = req.body;
      req.users.push(newUser); // Update in-memory users list
  
      res.send('done');
    } catch (error) {
      console.error('Failed to write user:', error);
      res.status(500).send('Error saving user');
    }
  });
  
  export default router;