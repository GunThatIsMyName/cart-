import React from "react";
import { Clear, DECRESMENT, FetchData, INCRSEMENT, REMOVE_ITEM } from "./action";
import cartItems from "./data";
export const initState={
    cart : [],
    amount:1,
    price:0,
}

const reducer = (state,action)=>{
    switch(action.type){
        case REMOVE_ITEM:
            const {cart}=state;
            const newList = cart.filter(item=>item.id !==action.payload)
            return{
                ...state,cart:newList
            }
        case INCRSEMENT:
            const incre = state.cart.map(item=>{
                if(item.id === action.payload){
                    return{...item,amount:item.amount+1}
                }
                return item;
            })
            return{
                ...state,cart:incre
            }
        case DECRESMENT:
            const decre = state.cart.map(item=>{
                if(item.id === action.payload){
                    if(item.amount > 0 ){
                        return{...item,amount:item.amount-1}
                    }
                }
                return item;
            }).filter(item=>item.amount!==0)
            return{
                ...state,cart:decre
            }
        case Clear:
            return{
                ...state,cart:[]
            }
        case FetchData:
            console.log(action.payload)
            return{
                ...state,cart:action.payload
            }
        default:
            throw new Error();
    }
}

export default reducer