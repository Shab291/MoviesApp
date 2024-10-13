import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../Components/Card'
import axios from 'axios'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()


  const query = location?.search?.slice(3)

  const fetchData = async()=>{
    try {
      const response = await axios.get(`/search/multi`,{
        params : {
          query : location?.search?.slice(3),
          page : page
        }
      })
      setData((preve)=>{
        return[
          ...preve, 
          ...response.data.results
        ]
      })

    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    if(query){
      setPage(1)
      setData([])
      fetchData()
    }

  },[location?.search])

  const handleScroll =()=>{
    if((window.innerHeight + window.scrollY)>= document.body.offsetHeight){
      setPage(preve => preve + 1)
    }
  }

  useEffect(()=>{
    if(query){
      fetchData()
    }
    
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",  handleScroll)
  },[])


  console.log("location", location.search.slice(3))
  return (
    <div className='py-16'>

        <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-40'>
          <input 
            type='text'
            placeholder='Search Here...'
            onChange={(e)=> navigate(`/search?q=${e.target.value}`)}
            value={query?.split("%20")?.join(" ")}
            className='py-1 px-4 w-full text-lg bg-white rounded-full text-neutral-900'
          />
        </div>
        <div className='container mx-auto'>
        <h3 className='capitalize lg:text-xl text-lg font-bold my-3'>Search Results</h3>
       
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
            {
              data.map((searchData,index)=>{
                return(
                  <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
                )
              })
            }
          </div>
       
        </div>
    </div>
  )
}

export default SearchPage