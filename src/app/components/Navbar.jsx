import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from  'react-bootstrap';
import  Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from "react-bootstrap/Stack";
import Button from  'react-bootstrap/Button';
import { NavDropdown } from "react-bootstrap";

export default function Navigation(props){
    return (
        <Navbar 
        fixed="top"
        expand={props.expand} 
        bg={props.theme}
        data-bs-theme={props.theme} 
        className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <Stack  direction="horizontal" gap={2}>
                <div className="p-2">
                <img src='tube_downloader.svg'
                width={50}
                height={50}
                alt=""/>
                </div>
                <div className="p-2">
                Tube Downloader
                </div>
                </Stack>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

        </Container>
      </Navbar>
    )
}