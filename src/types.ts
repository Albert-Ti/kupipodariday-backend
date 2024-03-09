import { Request } from 'express';
import { User } from './users/entities/users.entity';

export type UserRequest = Request & { user: User };
