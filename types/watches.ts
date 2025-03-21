import { TypedObject } from "sanity";

// export interface Watch {
//     id:number
//     name:string
//     price:string
//     image:string
//   }



export interface FetchWatch {
    _id: string;
    name: string;
    slug:string;
    price: number;
    originalPrice:number;
    description:TypedObject
    image: string;
    category?:string
    quantity?:number
  }