import axios from "axios"
import { useEffect, useState } from "react"

const useFetch =(endpoint)=>{

    const [data, setData] =useState([])
    const [loading, setloading] =useState(false)

    const fetchData = async()=>{
        try {
            setloading(true)
            const response = await axios.get(endpoint)
            setloading(false)
            setData(response.data.results)
            //console.log(response)
          
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(()=>{
        fetchData()
      },[])

    return {data, loading}
}

export default useFetch