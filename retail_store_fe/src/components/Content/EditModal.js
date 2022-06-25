import React, { Component } from "react"
import axios from "axios"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"

class EditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      sku: '',
      productName: '',
      price: '',
      formErrors: {},
      ...this.props.selectedRow
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.id !== this.props.selectedRow.id) {
      this.setState({ ...this.props.selectedRow })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleFormValidation = () => {
    const { sku, productName, price } = this.state;
    let formErrors = {};
    let formIsValid = true;

    if (!sku) {
      formIsValid = false;
      formErrors["skuErr"] = "sku is required.";
    }

    if (!productName) {
      formIsValid = false;
      formErrors["productNameErr"] = "productName is required.";
    }

    if (!price) {
      formIsValid = false;
      formErrors["priceErr"] = "price is required.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;

  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleFormValidation()) {
      const { id, sku, productName, price } = this.state;

      axios.put(`http://127.0.0.1:8000/home/${id}`, { 'sku': sku, 'productName': productName, 'price': price })
        .then(response => this.props.getStoreData())
        .catch(error => {
          console.error('There was an error!', error);
        });
      // alert('You have been successfully registered.')
      this.setState(this.initialState)
      this.props.handleClose()
    }
  }


  render() {
    const { skuErr, productNameErr, priceErr } = this.state.formErrors;

    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextSKU">
              <Form.Label column sm="2">
                SKU
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="sku" value={this.state.sku} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            {skuErr && <div style={{ color: "red", paddingBottom: 10 }}>{skuErr}</div>}
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextProductName">
              <Form.Label column sm="2">
                Product Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="productName" value={this.state.productName} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            {productNameErr && <div style={{ color: "red", paddingBottom: 10 }}>{productNameErr}</div>}
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            {priceErr && <div style={{ color: "red", paddingBottom: 10 }}>{priceErr}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default EditModal;