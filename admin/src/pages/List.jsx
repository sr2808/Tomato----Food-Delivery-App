import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const List = () => {

  const [list, setList] = useState([])
  const URL = "http://localhost:4000"

  const fetchList = async () => {
   try {
    const response =await axios.get(`${URL}/api/food/list`)
      if(response.data.success) {
        setList(response.data.data)
      }
      else{
        toast.error("Error Occured!! Fetching List failed..");
      }
   } catch (error) {
      console.log(response);
   }

  }

  const removeFoodItem = async(foodId) => {
      try {
        const response = await axios.post(`${URL}/api/food/remove`,{ id:foodId});
        await fetchList();
        if(response.data.success) {
          toast.success("Food Item Removed")
        }
        else{
          toast.error("Error!")
        }
      } catch (error) {
        toast.error("Fetching Issues")
        console.log(response)
      }
  }

  useEffect(() => {
    fetchList()
  },[])
  return (
    <div className='list add flex flex-col px-6'>
      <p className='text-2xl text-outfit font-medium mx-2 my-4'>{list.length ? "All": "No"} Food Items</p>
      <div className="list-table">
        <div className="hidden list-table-format sm:grid grid-cols-5  items-center gap-3 px-3 py-4 border border-b-2 border-[#cacaca] text-lg title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
           return (
            <div key={index} className='font-medium flex flex-col list-table-format sm:grid  grid-cols-5 items-center gap-3 pb-3 my-3 rounded-lg sm:rounded-none sm:px-3 sm:py-4 border border-[#cacaca] text-lg'>
              <img className='sm:w-16 sm:h-16 w-full h-2/3 rounded-t-lg sm:rounded-none' src={`${URL}/images/`+item.image} alt=''/>
              <div className="item-name flex">
                <p className=' mx-1 sm:hidden'>Name:</p> <p>{item.name}</p>
              </div>
              <div className="item-name flex">
                <p className=' mx-1 sm:hidden'>Category:</p> <p>{item.category}</p>
              </div>
              <div className="item-name flex">
                <p className=' mx-1 sm:hidden'>Price:</p> <p>${item.price}</p>
              </div>
              <div className='flex justify-center items-center sm:hidden'>
                <button className='bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-600' onClick={() => removeFoodItem(item._id)}>
                  Delete Item
                </button>
              </div>
              
              <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={20}
                      height={20}
                      fill="currentColor"
                      className="cursor-pointer hidden sm:block"
                      onClick={() => removeFoodItem(item._id)}
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>


            </div>
           )
          })
        }
      </div>

    </div>
)}

export default List
