import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";



const BannerHome = () => {
    const bannerData = useSelector(state => state.moviesData.bannerData)
    const ImageURL = useSelector(state => state.moviesData.ImageURL)
    const [currentImage, setCurrentImage] = useState(0)


    const handleNext =() => {
        if(currentImage < bannerData.length - 1){
            setCurrentImage(preve => preve + 1)
        }
    }

    const handlePrevious =() => {
        if(currentImage > 0){
            setCurrentImage(preve => preve - 1)
        }  
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentImage < bannerData.length - 1){
                handleNext()
            }else
            {
                setCurrentImage(0)
            }
        },3000)


        return ()=> clearInterval(interval)

    },[bannerData, ImageURL, currentImage])

  

  return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data,index)=>{
                        return(
                            <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <div className='min-w-full min-h-full'>
                                    <img
                                    src={ImageURL+data.backdrop_path}
                                    className='h-full min-h-[450px] w-full object-cover'
                                    alt='No-Image'
                                    />
                                </div>
                                {/* Button next and previous image */}

                                <div className='absolute top-0 w-full h-full hidden items-center justify-between group-hover:flex px-4'>
                                <button onClick={handlePrevious} className='p-1 rounded-full text-2xl z-10 hover:text-black hover:bg-white '><FaAngleLeft/></button>
                                <button onClick={handleNext} className='p-1 rounded-full text-2xl z-10 hover:text-black hover:bg-white '><FaAngleRight/></button>
                                </div>


                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>


                                <div className='container mx-auto'>
                                    <div className=' absolute bottom-0 max-w-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p> 
                                        <div className='flex items-center gap-4'>
                                            <p> Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p> views : {Number(data.popularity).toFixed(0)}</p>
                                        </div>
                                    
                                        <button className=' px-4 py-2 text-black bg-white  font-bold rounded-md mt-4  hover:bg-gradient-to-l from-red-700 to-orange-400 shadow-md transition-all hover:scale-105'>
                                            Play Now
                                        </button>
                                    </div>
                                </div>

                                


                            </div>
                        )

                    })
                }
            </div>
        </section>
  )
}

export default BannerHome