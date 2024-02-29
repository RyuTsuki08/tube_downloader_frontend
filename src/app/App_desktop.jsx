import { useEffect, useState } from "react";
import { ThemeProvider, Container, Row, Col, Stack } from "react-bootstrap";
import Navigation from "./components/Navbar";
import InputToUrl from "./components/inputToUrl";


export default function App_Desktop(){
    return(
        <>
        <Navigation expand="lg" theme="dark" />

            <style type="text/css">
            {
                `
                .app-body{
                    height: 100vh
                }
                `
            }
            </style>

            <Container className="app-body">
                <Col  xs={12}>
                </Col>
                    <Col>
                        <Stack gap={3}>
                                <p className="p-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ratione aperiam. Mollitia quae unde expedita laborum ratione aspernatur a. Rem sequi molestiae sint facere suscipit sapiente magni nulla nam eaque?
                                </p>
                                <p className="p-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fugiat sit esse, veritatis neque doloribus doloremque explicabo voluptatem ullam ex corrupti incidunt vitae. Voluptatem eum cumque neque possimus ad quasi!
                                </p>

                            <>
                            </>

                    <Col>
                        <InputToUrl />
                    </Col>

                </Stack>
                    </Col>
            </Container>
        </>
    )
};