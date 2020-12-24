import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Interviewer } from '../../types';

interface Props
{
    addItemToState : (item : Interviewer) => void
    toggle : () => void
    updateState : (item : Interviewer) => void
    item : Interviewer
}

class AddEditUser extends React.Component<Props, Interviewer> {

    constructor(props : Props) {
        super(props);
     
        this.state = {
            id: '',
            name: '',
            email: '',
            tags: [],
            isAdmin : false,
            isInterviewer : false
          };
    }

    onChange = (e :any) => {
        if (e.target.name === 'Name')
            this.setState({name : e.target.value});
        else if (e.target.name === 'Email')
            this.setState({email : e.target.value});  
        else if (e.target.name === 'Tags')
            this.setState({tags : e.target.value.split(',')});
        else if (e.target.name === 'isAdmin')
            this.setState({isAdmin : e.target.checked});    
        else if (e.target.name === 'isInterviewer')
            this.setState({isInterviewer : e.target.checked});      
    }

    submitFormAdd = (e : any) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_API_URL+'/users', {
            name: this.state.name,
            email: this.state.email,
            tags: this.state.tags,
            isAdmin: this.state.isAdmin,
            isInterviewer: this.state.isInterviewer
        })
        .then(item => {
            var tmp = item.data;
            tmp.id = tmp._id;
            this.props.addItemToState(tmp);
            this.props.toggle();
        })
        .catch(err => console.log(err))
    }

    submitFormEdit = (e : any) => {
        e.preventDefault()
        console.log(this.state);
        axios.put(process.env.REACT_APP_API_URL+'/users/' + this.state.id, this.state)
        .then(item => {
            var tmp = item.data;
            tmp.id = tmp._id;
            this.props.updateState(tmp)
            this.props.toggle()
            }
        )
        .catch(err => console.log(err))
    }

    componentDidMount(){
        // if item exists, populate the state with proper data
        console.log(this.props.item);
        if(this.props.item){
        const { id, name, email, tags, isAdmin, isInterviewer } = this.props.item
        this.setState({ id, name, email, tags, isAdmin, isInterviewer })
        }
    }

    render() {
        return (
        <Form onSubmit={this.props.item?.id ? this.submitFormEdit : this.submitFormAdd}>
            <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="Name" id="Name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
            </FormGroup>
            <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" name="Email" id="Email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
            </FormGroup>
            <FormGroup>
                <Input name="isAdmin" type="checkbox" checked={this.state.isAdmin} onChange={this.onChange}/>
                <Label for="isAdmin">Admin</Label>
            </FormGroup>
            <FormGroup>
                <Input name="isInterviewer" type="checkbox" checked={this.state.isInterviewer} onChange={this.onChange}/>
                <Label for="isInterviewer">Interviewer</Label>
            </FormGroup>
            <FormGroup>
                <Label for="Tags">Tags</Label>
                <Input type="text" name="Tags" id="Tags" onChange={this.onChange} value={this.state.tags === null ? '' : this.state.tags} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        );
    }
}

export default AddEditUser