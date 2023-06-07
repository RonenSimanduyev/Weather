import Image from 'next/image';
import { Inter } from 'next/font/google';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { Weather } from '@/components/Weather';
import { Spinner } from '@/components/Spinner';

const inter = Inter({ subsets: ['latin'] });

// Create a new instance of QueryClient
const queryClient = new QueryClient();

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
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
    const [city, setCity] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

    const { data, isLoading } = useQuery(['weather', city], () =>
        axios.get(url).then((response) => response.data)
    );

    const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await queryClient.prefetchQuery(['weather', city], () =>
            axios.get(url).then((response) => response.data)
        );
        setCity('');
    };
    return (
        <>
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/40 z-[1]" />
            <Image
                src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="background image"
                layout="fill"
                objectFit="contain"
                className="w-[100vw] lg:w-[600px] lg:h-[100vh]"
            />

            <div className="relative flex justify-between items-center sm:w-[100vw] lg:max-w-[500px] w-full m-auto py-4 text-white z-10">
                <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
                    <div>
                        <input className="placeholder-grey bg-transparent w-[90vw] lg:w-[450px] focus:outline-none" type="text" placeholder="search city" onChange={(e) => setCity(e.target.value)} />
                    </div>
                </form>
            </div>
            {/* Display weather */}
            {isLoading ? (
                <Spinner />
            ) : (
                data && data.main ? (
                    <div className="m-auto block">
                        <Weather data={data} />
                    </div>
                ) : null
            )}
        </>
    );

}
