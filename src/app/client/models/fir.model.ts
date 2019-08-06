import { CrimeTypes } from './CrimeTypes.model';
import { PoliceStation } from './PoliceStation.model';

export class Fir{
    id:number
    title:string
    dateOfCrime:string
    description:string
    crimeType:CrimeTypes
    policeStation:PoliceStation
}