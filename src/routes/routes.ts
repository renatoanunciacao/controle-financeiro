import Home from "../pages/home";
import Login from "../pages/login";

interface routeProps {
    id: number;
    path: string;
    component: React.FC;
}


export const routes: routeProps[] = [
    {
        id: 0,
        path: `/finances/login`,
        component: Login,
    },
    {
        id: 1,
        path: `/finances/home`,
        component: Home,
    },

]

