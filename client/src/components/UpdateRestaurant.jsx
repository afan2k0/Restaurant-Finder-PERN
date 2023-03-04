import React, { useContext, useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData();
    },[]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(updatedRestaurant);
        navigate("/");
    }
    return (
        <div> 
            <form action=''>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input id="name" className='form-control' type='text' 
                    value={name} 
                    onChange={e => setName(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input id="location" className='form-control' type='text' 
                    value={location} 
                    onChange={e => setLocation(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input id="price_range" className='form-control' type='number' 
                    value={priceRange} 
                    onChange={e => setPriceRange(e.target.value)}/>
                </div>
                <button type="submit" className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant