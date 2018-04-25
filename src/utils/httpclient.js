import axios from 'axios'

const httpclient = axios.create({
  baseURL: 'http://localhost:8080/video/'
})
export default httpclient
