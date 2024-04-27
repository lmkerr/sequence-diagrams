import { ReactElement, lazy } from 'react';

interface RouteConfig {
    path: string;
    element: ReactElement;
}

// eslint-disable-next-line react-refresh/only-export-components
const Diagram = lazy(() => import('./diagram/diagram.component').then(module => ({ default: module.Diagram })));

const routes: RouteConfig[] = [
    {
        path: '/',
        element: <></>
    },
    {
        path: '/diagram/:pathString*',
        element: <Diagram />
    }
];

export { routes };