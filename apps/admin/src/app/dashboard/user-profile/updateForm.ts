export class Update {
    name : string
    email : string
    mobile_no : number
    profile_image : string
    address : Address[]
}

export class Address {
    address1 : string
    city : string
    state : string
    pinCode : number
}