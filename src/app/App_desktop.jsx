import { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import Navigation from "./components/Navbar";


export default function App_Desktop(){
    return(
        <>
        <ThemeProvider>
            <Navigation expand="lg" theme="dark" />
        </ThemeProvider>
        </>
    )
};