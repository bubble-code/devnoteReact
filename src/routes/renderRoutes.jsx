import { Route } from "react-router-dom";

export function getRoutes(allRoutes) {
    return allRoutes.map((route) => {
        if (route.collapse) {
            return getRoutes(route.collapse);
        }
        if (route.route) {
            return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
        return null;
    });
};