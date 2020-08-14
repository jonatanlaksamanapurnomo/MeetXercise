import React from "react";

const Home = React.lazy(() => import("../pages/home"));
const Train = React.lazy(() => import("../pages/train"));

const routes = [
    {path: "/", component: Home, exact: true, name: "Home"},
    {path: "/train", component: Train, exact: true, name: "Train"}
]

export default routes;