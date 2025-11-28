import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import Stack from "react-bootstrap/Stack";

export default function Navigation(props) {
  return (
    <Navbar
      fixed="top"
      expand="lg"
      variant="dark"
      className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <Stack direction="horizontal" gap={3} style={{ alignItems: 'center' }}>
            <div className="p-1">
              <img src='tube_downloader.svg'
                width={35}
                height={35}
                alt="Logo"
                style={{ filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))' }}
              />
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
              Tube<span className="text-gradient">Downloader</span>
            </div>
          </Stack>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  )
}