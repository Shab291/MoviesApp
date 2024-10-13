import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Card = ({data, trending, index, media_type}) => {
  const ImageURL = useSelector(state => state.moviesData.ImageURL)
  const mediaType = data.media_type ?? media_type



  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[220px] max-w-[220px] h-80 overflow-hidden block rounded-xl relative hover:scale-110'>
     
     {
        data?.poster_path? (
          <img
        src={ImageURL+data?.poster_path }
        alt=''
        />
        ) : (
          <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
            No Image Found
          </div>
        )
    }
      <div className='absolute top-3'>
        {
          trending && (
            <div className='px-4 py-1 rounded-r-full bg-black/50 overflow-hidden'>
              #{index} Trending
            </div>
          )
        }
      </div>
      <div className='absolute bottom-0 h-14 backdrop-blur-xl w-full p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg'>{data?.title || data?.name}</h2>
        <div className='text-sm text-neutral-400 flex justify-between'>
          <p>{ moment(data?.release_date || data?.first_air_date).format(" MMMM YYYY")}</p>
          <div className='flex'>
            <FaStar className='text-lg py-0.5'/>
            <p>{Number(data.vote_average).toFixed(1)}</p>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default Card;