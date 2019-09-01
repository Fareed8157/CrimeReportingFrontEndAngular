import { PoliceStation } from '../client/models/PoliceStation.model';

export class User{
    firstName:string
    lastName:string
    fatherName:string
    city:string
    address:string
    email:string
    password:string
    nic:string
    phoneNumber:string
    enabled:boolean
    policeStation:PoliceStation
}