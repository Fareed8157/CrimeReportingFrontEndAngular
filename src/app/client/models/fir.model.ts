import { CrimeTypes } from './CrimeTypes.model';
import { PoliceStation } from './PoliceStation.model';
import { User } from 'src/app/models/user.model';

export class Fir{
    id:number
    dateOfCrime:string
    description:string
    crimeType:CrimeTypes[]=[]
    placeOfIncident:string
    addressOfcomplainant:string
    policeStation:PoliceStation
    status:boolean
    user:User
}