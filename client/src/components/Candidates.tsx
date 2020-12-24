import React from 'react';
import axios from 'axios';
import Header from './Header';
import CandidateInput from './CandidateInput'
import 'bootstrap/dist/css/bootstrap.min.css';
import CandidatesList from './Lists/CandidatesList';
import {v1 as uuid} from 'uuid';
import { Candidate } from '../types';

export interface State
{
  candidates: Candidate[],
  nextId : string,
  item : Candidate,
  editItem : boolean
}

const emptyItem = (): Candidate => ({
  id: '',
  name : '',
  role : ''
});

export default class Candidates extends React.Component<any, State> {
  constructor(props : any)
  {
    super(props);

    this.state = { 
      candidates : [],
      nextId : uuid(),
      item : emptyItem(),
      editItem : false
    };

    this.addCandidate = this.addCandidate.bind(this);
    this.removeCandidate = this.removeCandidate.bind(this);
    this.editCandidate = this.editCandidate.bind(this);
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL+'/candidates/')
      .then(response => {
        var tmp = response.data.map((d : any)=>
          {
            d.id = d._id;
            return d;
          });
        this.setState({ candidates: tmp })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addCandidate(input : {name: string, role : string})
  {
    if (this.state.editItem)
    {
      const c = this.state.item;
      c.name = input.name;
      c.role = input.role;
      axios.put(process.env.REACT_APP_API_URL+'/candidates/' + this.state.item.id, c)
      .then(res=>{
        this.updateCandidateState(res);
      });
    }
    else
    {
      const c = {
        name : input.name,
        role : input.role
      };
      axios.post(process.env.REACT_APP_API_URL+'/candidates', c)
      .then(res=>{
          this.updateCandidateState(res);
      });
    }
  }

  updateCandidateState(res : any)
  {
    console.log(res.data);
    const id = res.data._id
    console.log("id : ", id);
  
    let newList = [...this.state.candidates, {id: id, name : res.data.name, role: res.data.role}];
    this.setState ({ candidates: newList, nextId : uuid(), item : emptyItem(), editItem : false});
  }

  removeCandidate(id: string)
  {
    axios.delete(process.env.REACT_APP_API_URL+'/candidates/'+id)
      .then(response => { console.log(response.data)});

    this.setState( {
      candidates : this.state.candidates.filter((c, i) => c.id !== id)
    });
  }

  editCandidate (id: string)
  {
    const filteredList = this.state.candidates.filter((c, i) => c.id !== id);
    
    const item = this.state.candidates.find(c => c.id === id);
    
    this.setState( {
      candidates : filteredList,
      item : item as Candidate,
      editItem : true
    });
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <Header/>
            <CandidateInput addCandidate={this.addCandidate} candidate={this.state.item} editItem={this.state.editItem}/>
            <CandidatesList removeCandidate={this.removeCandidate} editCandidate={this.editCandidate} candidates={this.state.candidates}/>
          </div>
        </div>
      </div>
    );
  }
}