import { jwtDecode } from "jwt-decode";

import React, { useState } from "react";


let saveToken = (token) =>{
    localStorage.setItem('token',token) 
}

let logout = () => {

    localStorage.removeItem('token') 
}


let isLogged = () => {
   let token = localStorage.getItem('token') ;
   return !! token

}

 const getToken = () => {
  return localStorage.getItem('token');
};

const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Erreur de décodage du token :", error);
    return null;
  }
};

const isAdmin = () => {
  const userInfo = getUserInfo();
  return userInfo?.isAdmin === true;
};

export const accountService = {
  saveToken,
  logout,
  isLogged,
  getToken,
  getUserInfo,
  isAdmin,
};