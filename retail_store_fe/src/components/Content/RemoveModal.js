import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";


class RemoveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            sku: '',
            ...this.props.selectedRow
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.id !== this.props.selectedRow.id) {
            this.setState({ ...this.props.selectedRow })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id } = this.state;

        axios.delete(`http://127.0.0.1:8000/home/${id}`)
            .then(response => this.props.getStoreData())
            .catch(error => {
                console.error('There was an error!', error);
            });
        this.props.handleClose()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Are you sure you want to delete the '{this.state.sku}' ?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RemoveModal; 