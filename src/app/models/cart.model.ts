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

export interface chat{
    items:Array<chatIitem>
}
export interface chatIitem{
    name:string;
    message:string;
    nots:number
}