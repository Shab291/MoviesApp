import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../Hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import useFetch from '../Hooks/useFetch'
import moment from 'moment'
import HorizontalScrollCard from '../Components/HorizontalScrollCard'



const DetailsPage = () => {
  const params = useParams()
  const ImageURL = useSelector(state => state.moviesData.ImageURL)
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data : castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data : similarData} = useFetch(`/${params?.explore}/${params?.id}/similar`)
  
 
 
  console.log("data", data)
  console.log("cast", castData)
  




  const duration = (Number(data?.runtime)/60).toFixed(1).split(".")

  return (
    <div>
        <div className='w-full h-[65vh] relative hidden lg:block'>
          <div className='w-full h-full'>
            <img
              src= {ImageURL+data?.backdrop_path}
              className='h-full w-full object-bottom'
              alt='no-image'
            />
          </div>

          <div className='absolute h-full w-full top-0 bg-gradient-to-t from-neutral-900 to-transparent '>
          </div>
        </div>

        <div className='container mx-auto lg:mx-10 px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
          <div className=' relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
            <img
                src= {ImageURL+data?.poster_path}
                className='h-80 w-60 object-cover rounded-md'
                alt='no-image'
            />
          </div>

          <div>
            <h2 className='text-xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
            <p className='text-neutral-400'>{data?.tagline}</p>

            <div className='bg-white p-[0.5px] rounded-full my-3'></div>

            <div className='flex items-center gap-2 my-3'>
              <p> Rating: {Number(data?.vote_average).toFixed(1)} </p>
                <span>|</span>
              <p> Views: {Number(data?.vote_count)} </p>
                <span>|</span>
              <p> Duration: {duration[0]}h {duration[1]}m</p>
                
            </div>

            <div className='bg-white p-[0.5px] rounded-full my-3'></div>

            <div>
              <h3 className='text-white font-xl font-bold mb-1'>Overview</h3>
              <p>{data?.overview}</p>

              <div className='flex gap-2 pt-3'>
                <p>Status: {data?.status}</p>
                  <span>|</span>
                <p>Release Date: {moment(data?.release_date || data?.last_air_date).format("MMMM YYYY")}</p>
              </div>
            </div>

            <div className='bg-white p-[0.5px] rounded-full my-3'></div>

            <div>
              <p> <span className='text-white font-bold'>Director:</span> {castData?.crew?.filter(el => el?.job === "Director")?.map(el => el?.name).join(", ")}</p>
            </div>

            <div className='container'>
              <h2 className='text-lg lg:text-2xl font-bold my-3'>Star Cast</h2>
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-3'>
                    {
                      castData?.cast?.filter(el => el?.profile_path).map((starCast,index)=>{
                        return(
                          <div>
                            <div>
                              <img 
                                src={ImageURL+starCast?.profile_path}
                                className='w-20 h-20 rounded-full object-cover'
                                alt='No-Image'
                            
                              />
                            </div>
                            <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                          </div>
                        )
                      })
                    }
              </div>
            </div>

          </div>

        </div>


        <div>
          <HorizontalScrollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
          
        </div>

    </div>
  )
}

export default DetailsPage