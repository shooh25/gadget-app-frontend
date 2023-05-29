import axios from "axios";

const client = axios.create({
  baseURL: "https://mygadgets.herokuapp.com/"
  // baseURL: "http://localhost:3001"
})

export default client