import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownMenu from '../Components/DropdownMenu'


function Navbar() {
  let menudata = [
    { Name: 'Home', href: "/" },
    { Name: 'Collections', href: "/Collections" },
    { Name: 'Trends', href: "/Trends" },
    { Name: 'About Us', href: "/AboutUs" }
  ]

  const [menu, setmenu] = useState(false)
  const [ismenuopen, setismenuopen] = useState(false)

  const handlechange = () => {
    setmenu(!menu)
  }

  return (
    <div >
      <nav className='bg-white flex drop-shadow-md text-2xl justify-between items-center py-3 px-5'>
        <div>Logo</div>
        <div>

          <ul className=' hidden md:flex gap-5 uppercase menuNav text-[#3333343] '>

            {
              menudata.map((value,key) =>
              (

                <li className='hover:text-blue-300' key={key}> <Link to={value.href}>{value.Name}</Link></li>


              ))
            }
          </ul>

        </div>

        <div className='flex justify-center gap-4'>
          <DropdownMenu />

          <div onClick={() => setismenuopen(!ismenuopen)} className='flex justify-center items-center gap-2'>



            <div onClick={handlechange} className='md:hidden'>

              {
                menu ? (<i className="fa-solid fa-xmark text-4xl"></i>) :
                  (<i className="fa-solid fa-bars text-4xl"></i>)
              }
            </div>
          </div>

        </div>



        <div className={`absolute xl:hidden top-[50px] left-0 w-full bg-white flex flex-col items-center gap-5
          pb-5 font-semibold text-xl transform transition-transform ${ismenuopen ? "opacity-100" : "opacity-0"} `}>

          {
            menudata.map((value,key) =>
            (

              <div className='hover:text-blue-300' key={key}> <Link to={value.href}>{value.Name}</Link></div>


            ))
          }
        </div>



      </nav>
    </div>
  )
}

export default Navbar