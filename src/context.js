import React, { useState, useContext, useReducer, useEffect } from "react";
import { Clear, DECRESMENT, FetchData, INCRSEMENT, REMOVE_ITEM } from "./action";
import reducer, { initState } from "./reducer";
const url = "https://course-api.com/react-useReducer-cart-project";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const AppContext = React.createContext();


const AppProvider = ({ children }) => {

  const [state,dispatch] = useReducer(reducer,initState)

  const removeItem = (data) => {
    dispatch({type:REMOVE_ITEM,payload:data})
  };
  const countItem = (id,data)=>{
    if(data==="inc"){
      dispatch({type:INCRSEMENT,payload:id})
    }else{
      dispatch({type:DECRESMENT,payload:id})
    }
  }
  const clearItem = ()=>{
    dispatch({type:Clear})
  }
  const getData = async()=>{
    const hello = await fetch(url)
    const data = await hello.json();
    console.log(data,"hell")
    dispatch({type:FetchData,payload:data})
}
  useEffect(()=>{
    getData()
  },[])

  const {totalPrice,totalAmount} = state.cart.reduce((total,data)=>{
    const itemPrice = data.price * data.amount;
    const itemAmount = data.amount;
    total.totalPrice = total.totalPrice+itemPrice
    total.totalAmount = total.totalAmount+itemAmount;
    return total
  },{
    totalPrice:0,
    totalAmount:0
  })
  
  return (
    <AppContext.Provider value={{ totalPrice,totalAmount,countItem,clearItem,removeItem,...state }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
