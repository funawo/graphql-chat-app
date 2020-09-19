import React from 'react';
import {
  Nav,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'

const Navigation = () => {
  return (
    <>
      <Nav className="sidebar bg-light d-block col-2">
        <Nav.Item>
          <Nav.Link>
            チャンネル1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            チャンネル2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            チャンネル3
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Navigation;