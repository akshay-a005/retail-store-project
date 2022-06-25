import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Form, InputGroup } from "react-bootstrap";


class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileToUpload: null
        }
    }

    handleFile = event => {
        event.preventDefault();
        const fileToUpload = event.target.files[0];
        this.setState({
            fileToUpload: fileToUpload,
        });
    };

    handleSubmitData = event => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("file", this.state.fileToUpload);

        axios
            .post('http://127.0.0.1:8000/home/', formData)
            .then(response => {
                this.setState({
                    fileToUpload: null
                });
                this.props.getStoreData()
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    render() {
        return (
            <div className="container-fluid bg-light text-dark p-5">
                <div className="container bg-light p-5">
                    <form onSubmit={this.handleSubmitData}>
                        <FormGroup>
                            <Form.Label>Upload csv file</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control type="file" onChange={this.handleFile} accept={".csv"}></Form.Control>
                                <Button block bssize="large" type="submit">
                                    Submit
                                </Button>

                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
        );
    }
}

export default FileUpload; 