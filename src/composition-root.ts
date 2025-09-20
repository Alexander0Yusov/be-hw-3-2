import 'reflect-metadata'; // не забывать там где создается контейнер
import { Container } from 'inversify';
import { UsersRepository } from './4-users/repository/users.repository';
import { UsersService } from './4-users/application/users.service';
import { UsersController } from './4-users/router/controller/users-controller';
import { UsersQwRepository } from './4-users/qw-repository/users-qw-repository';
import { AuthService } from './5-auth/domain/auth.service';
import { SessionsService } from './7-security/application/sessions.service';
import { SessionsRepository } from './7-security/repository/sessions.repository';
import { AuthController } from './5-auth/router/controller/auth-controller';
import { SecurityController } from './7-security/router/controller/security.controller';
import { SessionsQwRepository } from './7-security/qw-repository/sessions-qw-repository';

export const container = new Container();

container.bind(AuthService).toSelf();
container.bind(AuthController).toSelf();

container.bind(SessionsRepository).toSelf();
container.bind(SessionsQwRepository).toSelf();
container.bind(SessionsService).toSelf();
container.bind(SecurityController).toSelf();

container.bind(UsersRepository).to(UsersRepository);
container.bind(UsersQwRepository).to(UsersQwRepository);
container.bind(UsersService).to(UsersService);
container.bind(UsersController).to(UsersController);
