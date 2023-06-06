import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from "axios";
import {useState} from "react";
import  {BsSearch} from "react-icons/bs"

import {Weather} from "@/components/Weather";
import {Spinner} from "@/components/Spinner";

const inter = Inter({ subsets: ['latin'] })


interface WeatherData {
    main: {
        temp: number;
        feels_like: number; // Updated property name to match 'feelsLike'
        humidity: number; // Added 'humidity' property
    };
    weather: {
        icon: string;
        main: string;
    }[];
    name: string;
    wind: {
        speed: number;
    };
}

export default function Home() {
    const [city ,setCity] =useState('')

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    if(isLoading){
        return <Spinner/>
    }
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
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/40 z-[1]"/>
            <Image
                src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="background image"
                layout="fill"
                objectFit="contain"

            />
            <div className=" relative flex justify-between items-center max-w-[500px] w-full m-auto py-4 text-white z-10" >
                <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl" >
                    <div>
                        <input className="placeholder-grey bg-transparent w-[450px] focus:outline-none" type="text" placeholder="search city" onChange={(e)=>setCity(e.target.value)}/>

                    </div>
                    <button onClick={fetchWeather}><BsSearch size={20}/></button>
                </form>
            </div>
            {/*    display weather*/}
            {weather?.main ? <div className="m-auto block"><Weather data={weather}/> </div> : null}
        </>

    );



}
