import React from 'react';
import CandidateItem from '../CandidateItem';
import { Candidate } from '../../types';

export interface Props
{
    candidates: Candidate[],
    removeCandidate : (id: string) => void
    editCandidate : (id: string) => void
}


export default class CandidatesList extends React.Component<Props> {
    constructor(props : any) {
        super(props);

        this.removeCandidate = this.removeCandidate.bind(this);
    }

    removeCandidate(id : string)
    {
        this.props.removeCandidate(id);
    }

    render()
    {
        return(
        <div>
            <ul className="list-group my-5">
              <h3 className="text-capitalize text-center">Candidates</h3>
              {
                this.props.candidates.map((c) => {
                  return <CandidateItem candidate={c} key={c.id} removeCandidate={this.removeCandidate} editCandidate={this.props.editCandidate}/>
                })
              }
            </ul>
        </div>);
    }
}