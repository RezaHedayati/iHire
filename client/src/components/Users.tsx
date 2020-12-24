import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Modals/UserModal'
import DataTable from './Lists/UsersList'
import axios from 'axios';
import '../App.css';
import { Interviewer } from '../types';


interface Props
{}

interface State
{
    items: Interviewer[]
}

export default class Users extends Component<Props, State> {

    constructor(props : Props) {
        super(props);
        
        this.state = {
            items : [{ id : '', name : '', email : '', tags: [], isAdmin : false, isInterviewer : false}]
        }
    }

    getItems(){
        axios.get(process.env.REACT_APP_API_URL+'/users/')
      .then(response => {
        var tmp = response.data.map((d : any)=>
          {
            d.id = d._id;
            return d;
          });
          this.setState({items : tmp});
        })
        .catch(err => console.log(err))
    }

    addItemToState = (item : Interviewer) => {
        this.setState(prevState => ({
        items: [...prevState.items, item]
        }))
    }

    updateState = (item : Interviewer) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
        // destructure all items from beginning to the indexed item
        ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
        item,
        // add the rest of the items to the array from the index after the replaced item
        ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
    }

    deleteItemFromState = (id: any) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
    }

    componentDidMount(){
        this.getItems()
    }

    render() {
        return (
        <Container className="App">
            <Row>
            <Col>
                <h1 style={{margin: "20px 0"}}>Users</h1>
            </Col>
            </Row>
            <Row>
            <Col>
                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
            </Col>
            </Row>
            <Row>
            <Col>
                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} item={{id:'', name: '', email: '', tags: [], isAdmin : false, isInterviewer : false}} 
                    updateState={()=>{}} className=""/>
            </Col>
            </Row>
        </Container>
        )
    }
}