import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display lg:mt-[30px] md:mt-[20px]' id='food-display'>
      <h2 className='font-medium my-3 font-outfit' style={{fontSize: "max(2vw, 24px)"}}>Top dishes near you</h2>
      <div className="food-display-list grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[30px]">
        {
          food_list.map( (item, index) => {
            if (category==="All" || category===item.category) {
              return (
                <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay;
