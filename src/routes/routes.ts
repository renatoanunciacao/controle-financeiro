import Home from "../pages/home";
import Login from "../pages/login";

interface routeProps {
    id: number;
    path: string;
    component: React.FC;
}

const baseUrl: string = "/finances";

export const routes: routeProps[] = [
    {
        id: 0,
        path: `${baseUrl}/login`,
        component: Login,
    },
    {
        id: 1,
        path: `${baseUrl}/home`,
        component: Home,
    },

]

