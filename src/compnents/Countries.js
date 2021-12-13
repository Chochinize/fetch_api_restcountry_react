import React from 'react'
import { useState,useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Countries = () => {
    

    const[country,setCountry] = useState([])
    const [options,setOptions] = useState([])
    const[land,setLand] = useState('Spain')
    useEffect(() => {
    
        (async function () {
            let result = await (await axios.get(`https://restcountries.com/v2/all`)).data
            let newRes =  result.map(item => {
                return  {value: item.name, label: item.name}
            })
           
            setOptions(newRes)

        } ());
    }, [])

    
    console.log(options);


    const fetchData = () =>{
        return axios.get(`https://restcountries.com/v2/name/${land}`).then((res)=>{
        
            return res.data
            
          
        })
        
        .catch((err)=>{
            console.error(err);
        })
    }
    
    const changeHandleEvenet = (e) =>{
        setLand(e.value)
        
           
        
    }



useEffect(() => {
    fetchData().then(Apicountry=>{
        setCountry(Apicountry)
       
    });
    
    
}, [land])

    
    return (
        <div className='grid  justify-center'>
            <div>
            <h1>WELCOME</h1>
                {country.map((place,cID)=><div className='w-52 text-l font-player2 bg-blue-300' key={cID}> <p> Currencies:{  place.currencies[0].symbol }</p>   <p>Name: {place.name}</p> <p>Capital:{place.capital}</p> <p>Population:{place.population}  </p> <p className=' '> Languages: {place.languages[0].name} </p> <img  className='h-max'src={place.flag}></img> <Select  onChange={(e)=>changeHandleEvenet(e)} options={options}/> </div>)}
            </div>
            
        </div>
    )
}

export default Countries
