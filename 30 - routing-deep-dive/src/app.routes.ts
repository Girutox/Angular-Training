import { CanMatchFn, RedirectCommand, Route, Router } from "@angular/router";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./app/not-found/not-found.component";
import { routes as userRoutes } from './app/users/user.routes';
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = () => {
  const router = inject(Router);
  const randomValue = Math.random();

  if (randomValue < 1) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Route[] = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No tasks seelcted'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello, World!'
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];