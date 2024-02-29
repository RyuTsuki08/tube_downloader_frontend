import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from  'react-bootstrap';
import  Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from "react-bootstrap/Stack";
import Button from  'react-bootstrap/Button';
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation(props){
    return (
        <Navbar 
        fixed="bottom"
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

          {/* <Button>
          <FontAwesomeIcon icon="fa-brands fa-square-github" style={{color: "#c12525",}} />
          </Button> */}
          

        </Container>
      </Navbar>
    )
}