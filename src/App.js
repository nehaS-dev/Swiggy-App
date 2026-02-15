import React from "react";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Body from "./components/Body/Body";
import RestaurantMenu from "./components/Body/RestaurantMenu";

const appRouter = createBrowserRouter ( [
    {
        path : "/" ,
        element : <AppLayout/>,
        children : [
            {
                path : "/",
                element : <Body/>
            },
            {
                path : "/restaurants/:resid",
                element : <RestaurantMenu/>
            }
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={appRouter}/>
    )
}
export default App;