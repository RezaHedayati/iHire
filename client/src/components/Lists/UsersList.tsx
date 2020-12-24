import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/UserModal'
import axios from 'axios';
import { Interviewer } from '../../types';


interface Props{
    deleteItemFromState : (id : string) => void
    items : Interviewer[],
    updateState : (item : Interviewer) => void
}

class UsersList extends Component<Props> {

    deleteItem = (id : string) => {
        let confirmDelete = window.confirm('Delete item forever?')
        if(confirmDelete){
            axios.delete(process.env.REACT_APP_API_URL+'/users/'+id)
            .then(item => {
                console.log(item.data);
                this.props.deleteItemFromState(id)
            })
            .catch(err => console.log(err))
            }
    }

    render() {

        const items = this.props.items.map(item => {
        return (
            <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.tags.join()}</td>
            <td>
                <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} className="" addItemToState={()=>{}}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                </div>
            </td>
            </tr>
            )
        })

        return (
        <Table responsive hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {items}
            </tbody>
        </Table>
        )
    }
}

export default UsersList