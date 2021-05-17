import Image from 'next/image';
import {useState, useEffect} from 'react';
import ReactMapGl, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

export default function EventMap({evt}) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        width: '100%',
        height: '500px',
        zoom: 12
    });

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    useEffect(() => {
        Geocode.fromAddress("Eiffel Tower").then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewport({...viewport, latitude: lat, longitude: lng});
                setLoading(false);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    if(loading) return false;

    return (
        <ReactMapGl 
            {...viewport}
            onViewportChange={(vp) => setViewport(vp)} 
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAXBOX_API_TOKEN}
        >
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image src="/images/pin.svg" width={30} height={30}/>
            </Marker>
        </ReactMapGl>
    )
}
