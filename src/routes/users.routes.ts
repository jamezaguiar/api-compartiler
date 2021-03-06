import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import ListUserByIdService from '../services/ListUserByIdService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, whatsapp, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, whatsapp, password });
  delete user.password;

  return response.json(user);
});

usersRouter.use(ensureAuthenticated);

usersRouter.get('/list/:id', async (request, response) => {
  const { id } = request.params;

  const listUserById = new ListUserByIdService();

  const user = await listUserById.execute(id);

  return response.json(user);
});

usersRouter.get('/listAll', async (request, response) => {
  const listUsers = new ListUsersService();

  const users = await listUsers.execute();

  return response.json(users);
});

export default usersRouter;
