export interface ILogin {
  username: string
  password: string
}


export interface IRegister {
  id: number
  username: string
  email: string
  password: string
}



//user interface
export interface IUser {
  address: Address
  id: number
  email: string
  username: string
  password: string
  name: Name
  phone: string
  __v: number
}

export interface Address {
  geolocation: Geolocation
  city: string
  street: string
  number: number
  zipcode: string
}

export interface Geolocation {
  lat: string
  long: string
}

export interface Name {
  firstname: string
  lastname: string
}
