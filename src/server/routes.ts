import { Router } from 'express';
import { interfaces } from 'inversify';

const routeConfig = [
  __dirname + '/../user/routes',
];

const routes = (router: Router, container: interfaces.Container) => {
  routeConfig.map(route => register(route, router, container));
};

const register = (routePath: string, router: Router, container: interfaces.Container) => {
  const route = require(routePath);
  route.register(router, container);
};

export default routes;
