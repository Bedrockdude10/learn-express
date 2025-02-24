import { Request } from 'express';

// define relevant types here

/**
 * Represents a user object
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

/**
 * Extends the Express Request object to include users
 */
export interface UserRequest extends Request {
    users?: User[];
}