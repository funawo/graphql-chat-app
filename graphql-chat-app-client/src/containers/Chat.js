import React from 'react';
import Header from '../components/Header';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import 'bootstrap/dist/css/bootstrap.css'

export default () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col as={Navigation}></Col>
          <Col xs={10} className="p-0">
            <Main />
          </Col>
        </Row>
      </Container>
    </>
  )
}
