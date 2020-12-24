
export interface Candidate
{
    id : string,
    name : string,
    role : string
}

export interface Interviewer
{
    id : string,
    name : string,
    email : string,
    tags : string[],
    isAdmin : boolean, 
    isInterviewer: boolean
}

export interface User
{
    name : string,
    email : string,
    id : number,
    imageUrl? : string
}