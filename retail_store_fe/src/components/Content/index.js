import React, { Component } from "react"
import axios from 'axios'
import { Container } from "react-bootstrap"
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import FileUpload from "./FileUpload"
import TableData from "./TableData"
import EditModal from "./EditModal"
import RemoveModal from "./RemoveModal"

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      showEditModal: false,
      showRemoveModal: false,
      selectedRow : {}
    }
  }

  componentDidMount() {
    this.getStoreData()
  }

  getStoreData = () => {
    axios.get('http://127.0.0.1:8000/home/')
    .then(response => {
      const res = response.data.map((item) => ({ ...item, action: item }));
      this.setState({ tableData: res })
    }
    );
  }

  handleEditModalClose = () => {
    this.setState({showEditModal: false})
  }

  handleRemoveModalClose = () => {
    this.setState({showRemoveModal: false})
  }

  handleEditModal = row => {
    this.setState({selectedRow: row, showEditModal: true})
  }

  handleRemoveModal = row => {
    this.setState({selectedRow: row, showRemoveModal: true})
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'SKU',
        accessor: 'sku',
      },
      {
        Header: 'Product Name',
        accessor: 'productName',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Date',
        accessor: 'updated_at',
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ value }) => (
          <div>
            <PencilFill onClick={() => this.handleEditModal(value)} color="royalblue" size={20} />&nbsp;&nbsp;
            <TrashFill onClick={() => this.handleRemoveModal(value)} color="royalblue" size={20} />
          </div>
        )
      }
    ]

    return (
      <Container fluid>
        <FileUpload getStoreData={this.getStoreData} />
        <TableData columns={columns} data={this.state.tableData} />
        {
        Object.keys(this.state.selectedRow).length > 0 &&  
        <EditModal show={this.state.showEditModal} handleClose={this.handleEditModalClose} 
        selectedRow={this.state.selectedRow} getStoreData={this.getStoreData} />
        }
        {
        Object.keys(this.state.selectedRow).length > 0 &&  
        <RemoveModal show={this.state.showRemoveModal} handleClose={this.handleRemoveModalClose} 
        selectedRow={this.state.selectedRow} getStoreData={this.getStoreData} />
        }
      </Container>
    )
  }
}

export default Content;