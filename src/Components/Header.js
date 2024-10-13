import React, { useEffect, useState } from 'react';
import logo from '../Assets/logo.png';
import sign from '../Assets/sign.png';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import {navigation} from '../Contents/navigation'




const Header = () => {

  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput, setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }
      
  },[searchInput, navigate])

  const handleSubmit =(e)=>{
    e.preventDefault()
  }


  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
        <div className=' container mx-auto px-3 flex items-center h-full'>
            <Link to={"/"}>
              <img 
                src={logo}
                alt='logo'
                width={150}
              />
            </Link>

            <nav className='hidden lg:flex items-center gap-2 ml-5'>
                {
                  navigation.map((nav, index) => {
                    return(
                      <div>
                        <NavLink key={nav.label} to={nav.href} className={({isActive})=> `px-2 hover:text-orange-300 ${isActive && "text-orange-300"}`}>
                          {nav.label}
                        </NavLink>
                      </div>
                    )
                  })
                }
            </nav>

            <div className='ml-auto flex items-center gap-5'>
              <form className=' flex items-center gap-2' onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Search here...'
                  className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />

                <button className='text-2xl text-white'>
                <BsSearch/>
                </button>
              </form>

              <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                <img 
                  src={sign}
                  alt='sign-img'
                  width= 'w-full h-full'
                />
              </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
