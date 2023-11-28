import { UserSchema } from './user/schemas/user.schema';
import { Connection } from 'mongoose';

//TODO: Move USER_MODEL and DATABASE_CONNECTION into constants.ts

export const userProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
