export interface Cart{
    items: Array<CartIitem>
}



export interface CartIitem{
    product:string;
    name:string;
    price:number;
    quantity:number;
    id:number
}