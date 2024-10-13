import React, { useEffect, useState } from 'react'
import BannerHome from '../Components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../Components/HorizontalScrollCard'
import axios from 'axios'
import useFetch from '../Hooks/useFetch'



const Home = () => {
  const trandingData = useSelector(state => state.moviesData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
  const {data : topRatedData} = useFetch('/movie/top_rated')
  const {data : popularTvSowData} = useFetch('/tv/popular')
  const {data : onTheAirShowData} = useFetch('/tv/on_the_air')


  return (
    <div>
        <BannerHome/>

        <HorizontalScrollCard data={trandingData} heading={"Trending"} trending={true}/>
        <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
        <HorizontalScrollCard data={topRatedData} heading={"Top Rated"} media_type={"movie"}/>
        <HorizontalScrollCard data={popularTvSowData} heading={"Popular TvShows"} media_type={"tv"}/>
        <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/>

        
    </div>
  )
}

export default Home