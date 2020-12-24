import React from 'react';
import { Candidate } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

export interface Props
{
    candidate : Candidate,
    editItem : boolean,
    addCandidate(e: any) : any;
}

export interface State
{
    name : string,
    role : string
}

export default class CandidateInput extends React.Component<Props, State> {
    constructor(props: any)
    {
        super(props);

        this.state = {name : '', role : ''};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.addCandidate = this.addCandidate.bind(this);
    }

    componentDidUpdate(prevProps : Props) {       
        if (this.props.candidate != null && prevProps.candidate !== this.props.candidate) {

            this.setState({
                name : this.props.candidate.name,
                role : this.props.candidate.role
            });
        }
    }

    handleNameChange(e: any){
        this.setState({name: e.target.value});
    }

    handleRoleChange(e: any){
        this.setState({role: e.target.value});
    }

    addCandidate(name : string, role : string)
    {
        if (name.length > 0)
        {
            this.props.addCandidate({name, role});
            this.setState( {name : '', role : ''});
        }
    }

    render(){
        return(
            <div className="card card-body my-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                            <FontAwesomeIcon icon={faUserAlt} />
                        </div>
                    </div>
                        <input type="text" className="form-control text-capitalize"
                            placeholder="add a candidate" value={this.state.name} onChange={this.handleNameChange}/>
                        <input type="text" className="form-control text-capitalize"
                            placeholder="Role" value={this.state.role} onChange={this.handleRoleChange}/>
                </div>
                <button type="submit" className= {this.props.editItem ? "btn btn-block btn-success mt-3" : "btn btn-block btn-primary mt-3" }
                    onClick={ () => this.addCandidate(this.state.name, this.state.role)}>
                        {this.props.editItem ? 'edit item' : 'add item'}
                </button>
                <div>
                </div>
            </div>
        );
    }
}