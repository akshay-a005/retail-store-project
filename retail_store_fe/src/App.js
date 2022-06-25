import React, { Component } from 'react';
import { ThemeProvider, Container } from 'react-bootstrap';
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

class App extends Component {

  render() {
    return (
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      >
        <Container fluid>
          <Header />
          <Content />
          <Footer />
        </Container>
      </ThemeProvider>
    )
  }
}

export default App;
