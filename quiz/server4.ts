import fs from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';
import { User, UserRequest } from './types'; // Import User type

const app = express();
const port = 8000;
const dataFile = '../data/users.json';

let users: User[] = [];

// Middleware to load users from file
const loadUsers = async () => {
  try {
    const data = await fs.promises.readFile(path.resolve(__dirname, dataFile));
    users = JSON.parse(data.toString());
    console.log('User data loaded successfully.');
  } catch (error) {
    console.error('Error loading user data:', error);
  }
};

// Middleware to attach users to request
const addUsersToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users.length > 0) {
    req.users = users;
    next();
  } else {
    res.status(404).json({ error: { message: 'Users not found', status: 404 } });
  }
};

// Middleware to save updated users list after write operations
const saveUsersToFile = async (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.users) return res.status(404).json({ error: 'Users not found' });

  try {
    await fs.promises.writeFile(dataFile, JSON.stringify(req.users));
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Failed to write user data:', error);
    return res.status(500).json({ error: 'Error saving user data' });
  }
  
  next();
};

// Load users on server start
loadUsers();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pass users middleware to routes
app.use('/read', addUsersToRequest, readUsersRouter);
app.use('/write', addUsersToRequest, writeUsersRouter, saveUsersToFile);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
