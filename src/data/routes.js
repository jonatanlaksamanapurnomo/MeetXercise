import React from "react";

const Home = React.lazy(() => import("../pages/home"));
const Train = React.lazy(() => import("../pages/train"));
const Host = React.lazy(() => import("../pages/host"));
const Join = React.lazy(() => import("../pages/join"));

const routes = [
    {path: "/", component: Home, exact: true, name: "Home"},
    {path: "/train", component: Train, exact: true, name: "Train"},
    {path: "/host", component: Host, exact: true, name: "Host"},
    {path: "/join", component: Join, exact: true, name: "Join"},
]

export default routes;