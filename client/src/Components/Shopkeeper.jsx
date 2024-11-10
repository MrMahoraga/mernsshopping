import React from 'react'

function Shopkeeper() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-slate-500 py-6 px-10 rounded-2xl h-[500px] w-[450px]'>
                <h1 className='font-bold text-2xl'>Create Your Shopkeeper Account</h1>
                <h1>Start your Business in seconds.Already have an account? <br /> <span className='text-[#6041da] hover:underline'>Login here.</span></h1>
            <div className='mt-2 flex w-[500px] flex-wrap gap-5'>

                <div>
                <h1 className='text-s font-semibold'>Your Name</h1>
                <input type="text"  placeholder='hjgjhohkjlhkjkhg'  className='rounded' />
                </div>

                <div>
                <h1 className='text-s font-semibold'>Your Email</h1>
                <input type="text"  placeholder='hjgjhohkjlhkjkhg'  className='rounded' />
                </div>

                <div>
                <h1 className='text-s font-semibold'>Your countary</h1>
                <input type="text"  placeholder='hjgjhohkjlhkjkhg'  className='rounded' />
                </div>

                <div>
                <h1 className='text-s font-semibold'>Your Name</h1>
                <input type="text"  placeholder='hjgjhohkjlhkjkhg'  className='rounded' />
                </div>
            </div>


            <div className='flex g'>
                or
            </div>

            </div>


        </div>
    )
}

export default Shopkeeper