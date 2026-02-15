import React,{useState} from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { Outlet } from "react-router-dom";



const AppLayout = () => {
    const [searchText , setSearchText] = useState("");
    return (
        <>
            <Header 
            searchText = {searchText}
            setSearchText = {setSearchText}/>
            <Outlet context = {{ searchText }}/>
        </>
    );
};

export default AppLayout;
