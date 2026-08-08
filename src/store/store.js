import { create } from 'zustand'
import axios from 'axios'
import { data } from 'react-router'
import { ArrowUpZA, Check, Cookie, Send } from 'lucide-react'
import { config } from 'dotenv'
import Serach from '../component/Search'


const library_store = create((set, get) => ({
  books: [],
  loading: false,
  error:null,
  res:null,
  user_data:null,
  page_data:null,
  search_data:null,
  book_detail_data:null,
  check_token:()=>{
    const token = document.cookie.split(";").find(value => value.startsWith("token"))
    if(token){
      return {"message":true}
    }else{
      return {"message":false}
    }
  },
  get_books: async () => {
    try{
      set({loading:true})
      let res = await axios.get(`${import.meta.env.VITE_BASE_URL_BOOKS}/books_data`)
      set({books:res.data.books})
    }catch(err){
        console.log(err)  
    }finally{
        set({loading:false})
    }
    },

  login: async(payload)=>{
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL_USERS}/login`, {
        
        "email":payload.email,
        "password":payload.password
      })
      const token = res.data.token
      document.cookie = `token=${token}; mex-age=604800; secure=true`
      return res
    }catch(err){
      return err.response
    }
  },

  register: async (payload)=>{
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL_USERS}/register`, {
        "fullname":payload.fullname,
        "email":payload.email,
        "password":payload.password,
        "address":payload.address,
        "phone":payload.phone,
        "books":[]
      })
      
      return res
    }catch(err){
      return err
    }
  },

  get_user : async ()=>{
    const result = get().check_token()
    if(!result){
      return {"message":"No Token!"}
    }
    const token = document.cookie.split("=")
    // console.log(token[1])
    try{
      // console.log(token)
      const  res = await axios.get(`${import.meta.env.VITE_BASE_URL_USERS}/get_user`, {
        headers:{
          "Authorization": `Bearer ${token[1]}` 
        }
      })
      set({user_data : res.data})
    }catch(err){
      return err
    }
  },
  logout_user: ()=>{
    document.cookie  = "token=; max-age=0; path=/"
  },
  update_user: async (payload)=>{
    const result = get().check_token()
    if(!result){
      return {"message":"No Token!"}
    }
    const token = document.cookie.split("=")
    try{
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL_USERS/user_update}`, {
        "fullname":payload.fullname,
        "email":payload.email,
        "phone":payload.phone,
        "address":payload.address
      }, {
        headers:{
          "Authorization":`Bearer ${token[1]}`
        }
      })
      return res
    }catch(err){
      return err
    }
  },
  delete_user: async()=>{
    const result = get().check_token()
    if(!result){
      return {"message":"No Token!"}
    }
    const token = document.cookie.split("=")
    try{
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL_USERS}/user_delete`, {
        headers:{
          "Authorization":`Bearer ${token[1]}`
        }
      })
      return res
    }catch(err){
      return err
    }
  },
  send_mail: async(email)=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL_USERS}/send_mail/${email}`)
      return res
    }catch(err){
      return err
    }
  },
  forget_pass: async (payload, email)=>{
    
    try{
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL_USERS}/forget_pass`, {
        "password":payload.password,
        "otp":payload.otp,
        "email":email
      })
      return res
    }catch(err){
      return err
    }
  },
  book_by_page: async (page, limit)=>{
    try{
      set({loading:true})
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL_BOOKS}/book_pegination?page=${page}&limit=${limit}`)
      set({page_data:res.data.data})
    }catch(err){
      return err
    }finally{
      set({loading:false})
    }
  },
  search_book :async (value)=>{
    try{
      set({loading:true})
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL_BOOKS}/search?value=${value}`)
      set({search_data:res.data})
    }catch(err){
      return err
    }finally{
      set({loading:false})
    }
  },
  book_detail: async (title)=>{
    set({loading:true})
    try{
      const res = await axios.get(`https://openlibrary.org/search.json?title=${title}`)
      
      set({book_detail_data:res.data})

    }catch(err){
      return console.log(err)
    }finally{
      set({loading:false})
    }
  }
}))

export default library_store