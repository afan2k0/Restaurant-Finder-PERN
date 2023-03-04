import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantsList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get("/");
            setRestaurants(response.data.data.restaurants)
            console.log(restaurants)
          }
          fetchData()
          .catch(console.error);    
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }))
        } catch(err) {

        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        console.log("update");
        navigate(`/restaurants/${id}/update`);
    }
    
    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`)
    }

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(element => {
                    return (
                        <tr onClick={() => handleRestaurantSelect(element.id)} key={element.id}>
                            <td>{element.name}</td>
                            <td>{element.location}</td>
                            <td>{"$".repeat(element.price_range)}</td>
                            <td>{element.ratings}</td>
                            <td><button className="btn btn-warning" onClick={(e) => handleUpdate(e, element.id)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => handleDelete(e, element.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantsList