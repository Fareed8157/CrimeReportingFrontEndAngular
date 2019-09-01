import { User } from 'src/app/models/user.model';
import { PoliceStation } from './PoliceStation.model';
import { NCType } from './nctype.model';

export class NC{
    id:number
    description:string
    user:User
    status:boolean
    policeStation:PoliceStation
    ncType:NCType
    ncSubmittedDate:any
}