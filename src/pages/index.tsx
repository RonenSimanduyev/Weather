import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from "axios";
import {useState} from "react";
import  {BsSearch} from "react-icons/bs";

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
    const [city ,setCity] =useState('')

    const [weather ,setWeather] =useState({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unitis=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

    const fetchWeather =(e:any)=>{
         e.preventDefault()
        setIsLoading(true)
        axios.get(url).then((response)=>{
            setWeather(response.data)
            console.log(response.data,'weather data')}
        )
        setCity('')
        setIsLoading(false)

    }

  return (
      <>
          <input className="text-blue-50" type="text" name="City" onChange={(e) => setCity(e.target.value)} />
          <button onClick={fetchWeather} className="123"> Fetch Weather</button>
          </>
  )
}
