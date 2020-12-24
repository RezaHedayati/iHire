import React from 'react';
import { Candidate } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export interface Props{
    candidate : Candidate,
    removeCandidate : (id: string) => void,
    editCandidate : (id: string) => void
}

export default class CandidateItem extends React.Component<Props>{

    removeCandidate(id : string)
    {
        this.props.removeCandidate(id);
    }

    render(){
        return(
        <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
            <div>
                <h6>{this.props.candidate.name}</h6>
                {this.props.candidate.role}
            </div>
            <div>
                <span className="mx-2 text-success">
                    <FontAwesomeIcon icon={faPen} onClick={(e) => this.props.editCandidate(this.props.candidate.id)}></FontAwesomeIcon>
                </span>
                <span className="mx-2 text-danger">
                    <FontAwesomeIcon icon={faTrash} onClick={(e) => this.removeCandidate(this.props.candidate.id)}></FontAwesomeIcon>
                </span>
            </div>
        </li>);
    }
}