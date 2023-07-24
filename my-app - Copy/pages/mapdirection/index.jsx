import Head from "next/head";
import { useEffect, useState } from "react";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Home() {
    const [Map, setMap] = useState();
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const ar = [0, 0]
    let coords=[]
    const [move, setMove] = useState({
        value:"driving"
    })
    const stores = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.66309099074051, 10.756098507593611]

                },
                'properties': {
                    'phoneFormatted': '(202) 234-7336',
                    'phone': '2022347336',
                    'address': 'Parkson Hung Vuong Plaza, 126 Đ. Hồng Bàng, Phường 12, Quận 5',
                    'name': 'CGV Hùng Vương Plaza',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 15th St NW',
                    'postalCode': '20005',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.71893157338643, 10.729046464578914]
                },
                'properties': {
                    'phoneFormatted': '(202) 507-8357',
                    'phone': '2025078357',
                    'address': 'Crescent Mall, Đ. Nguyễn Văn Linh, Tân Phú, Quận 7',
                    'name': 'CGV Crescent Mall',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 22nd St NW',
                    'postalCode': '20037',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.73319433316566, 10.801612047286138]
                },
                'properties': {
                    'phoneFormatted': '(202) 387-9338',
                    'phone': '2023879338',
                    'address': '12 Đ. Quốc Hương, Thảo Điền, Quận 2',
                    'name': 'CGV Thảo Điền',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at Dupont Circle',
                    'postalCode': '20036',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.76517099895284, 10.850268946230317]
                },
                'properties': {
                    'phoneFormatted': '(202) 337-9338',
                    'phone': '2023379338',
                    'address': '216 Võ Văn Ngân, Bình Thọ, Thủ Đức',
                    'name': 'CGV Vincom Thủ Đức',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 34th St NW',
                    'postalCode': '20007',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.70061781491385, 10.774904052450411]
                },
                'properties': {
                    'phoneFormatted': '(202) 547-9338',
                    'phone': '2025479338',
                    'address': 'Khách sạn Liberty Citypoint, Pasteur, Bến Nghé, Quận 1',
                    'name': 'CGV Liberty Citypoint',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'btwn 2nd & 3rd Sts. SE',
                    'postalCode': '20003',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.70199571733765, 10.778165788936523]
                },
                'properties': {
                    'address': '72 Đ. Lê Thánh Tôn, Bến Nghé, Quận 1',
                    'name': 'CGV VinCom Center Đồng Khởi',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'postalCode': '20740',
                    'state': 'MD'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.66546977049995, 10.813297961539282]
                },
                'properties': {
                    'phoneFormatted': '(301) 654-7336',
                    'phone': '3016547336',
                    'address': '60A Trường Sơn, Phường 2, Tân Bình',
                    'name': 'CGV Trường Sơn (CGV CT Plaza)',
                    'cc': 'US',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'postalCode': '20814',
                    'state': 'MD'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.61727392358938, 10.801601026269598]
                },
                'properties': {
                    'phoneFormatted': '(571) 203-0082',
                    'phone': '5712030082',
                    'address': 'Lầu, 2 Sơn Kỳ, Tân Phú',
                    'name': 'CGV Cinemas',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'btw Explorer & Library',
                    'postalCode': '20190',
                    'state': 'VA'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.61794241501529, 10.801944370313578]
                },
                'properties': {
                    'phoneFormatted': '(703) 522-2016',
                    'phone': '7035222016',
                    'address': 'Level 3 Aeon Mall, 30 Đường Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú',
                    'name': 'CGV Celadon Tân Phú',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at N Randolph St.',
                    'postalCode': '22203',
                    'state': 'VA'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.68918514115556, 10.82730346091203]
                },
                'properties': {
                    'phoneFormatted': '(610) 642-9400',
                    'phone': '6106429400',
                    'address': 'Saigonres Plaza, Tầng 4-5,Saigonres Plaza 188, 79-81 Nguyễn Xí, Phường 26, Bình Thạnh',
                    'name': 'CGV Saigonres Nguyễn Xí',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'postalCode': '19003',
                    'state': 'PA'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.66018028843894, 10.798936872231389]
                },
                'properties': {
                    'phoneFormatted': '(215) 386-1365',
                    'phone': '2153861365',
                    'address': '415 Hoàng Văn Thụ, Phường 2, Tân Bình',
                    'name': 'CGV Hoàng Văn Thụ',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'postalCode': '19104',
                    'state': 'PA'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.61299776157934, 10.743483294011716]
                },
                'properties': {
                    'phoneFormatted': '(202) 331-3355',
                    'phone': '2023313355',
                    'address': '1 Đường Số 17A, An Lạc, Bình Tân',
                    'name': 'CGV Aeon Mall Bình Tân',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 19th St',
                    'postalCode': '20036',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.70719471529317, 10.81670437311165]
                },
                'properties': {
                    'phoneFormatted': '(202) 331-3355',
                    'phone': '2023313355',
                    'address': '561A Đ. Điện Biên Phủ, Phường 25, Bình Thạnh',
                    'name': 'CGV Pear Plaza',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 19th St',
                    'postalCode': '20036',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.70207871559612, 10.777329899516834]
                },
                'properties': {
                    'phoneFormatted': '(202) 331-3355',
                    'name': 'CGV Parkson Đồng Khởi',
                    'phone': '2023313355',
                    'address': 'Tầng 5, Parkson Đồng Khởi, 35 bis, 45 Đ. Lê Thánh Tôn, Quận 1',
                    'city': 'Thành phố Hồ Chí Minh',
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.72138657319243, 10.795422831406537]
                },
                'properties': {
                    'phoneFormatted': '(202) 331-3355',
                    'phone': '2023313355',
                    'name': 'CGV VinCom Center Lanmark 81',
                    'address': 'Tầng B1 , TTTM Vincom Center Landmark 81, 772 Điện Biên Phủ, P.22, Q. Bình P.22, Q, Bình Thạnh',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 19th St',
                    'postalCode': '20036',
                    'state': 'D.C.'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [106.72132049060512, 10.827821572512963]
                },
                'properties': {
                    'phoneFormatted': '(202) 331-3355',
                    'phone': '2023313355',
                    'address': 'Tầng 6 TTTM Giga Mall, 240, 242 Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức',
                    'name': 'CGV Giga Mall Thủ Đức',
                    'city': 'Thành phố Hồ Chí Minh',
                    'country': 'United States',
                    'crossStreet': 'at 19th St',
                    'postalCode': '20036',
                    'state': 'D.C.'
                }
            },

        ]
    };
    stores.features.forEach((store, i) => {
        store.properties.id = i;
    });
    useEffect(() => {
        setPageIsMounted(true)
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1aG9hbmdhbmgyNyIsImEiOiJjbGpxdHVrMjIwM2JmM2ptbXRnNGEyZWhpIn0.fXaPZH3FpDVdRHIlYgd1wg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [106.719874, 10.797499], // starting position
            zoom: 15
        });
        // set the bounds of the map
        setMap(map)
    }, [])
    console.log(stores)
    const start = [106.719874, 10.797499];
    useEffect(() => {
        if (pageIsMounted && stores && Map) {
            Map.on('load', () => {
                // make an initial directions request that
                // starts and ends at the same location
                getRoute(start);
                try {
                    Map.addSource('places', {
                        'type': 'geojson',
                        'data': stores
                    });
                }
                catch (error) { }

                // Add starting point to the map
                Map.addLayer({
                    id: 'point',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: start
                                    }
                                }
                            ]
                        },
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#3887be'
                    }
                });
                addMarkers();


            },)
        }
    }, [pageIsMounted, stores, Map])
    function handleClick(e){
        move.value=e
        console.log(move)
        getRoute(coords)
        console.log(move)
    }
    //find way when you click
    useEffect(() => {
        if (pageIsMounted && stores && Map) {

            Map.on('click', (event) => {
                coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
                const end = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: coords
                            }
                        }
                    ]
                };
                if (Map.getLayer('end')) {
                    Map.getSource('end').setData(end);
                } else {
                    Map.addLayer({
                        id: 'end',
                        type: 'circle',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: 'Point',
                                            coordinates: coords
                                        }
                                    }
                                ]
                            }
                        },
                        paint: {
                            'circle-radius': 10,
                            'circle-color': '#f30'
                        }
                    });
                }
                getRoute(coords);
            });
        }
    }, [pageIsMounted, stores, Map])
    useEffect(() => {
        // find the way shortest from you
        if (pageIsMounted && stores && Map) {
            let min = 99999999;
            for (const marker of stores.features) {
                const d = (marker.geometry.coordinates[0] - start[0]) ** 2 + (marker.geometry.coordinates[1] - start[1]) ** 2;
                if (min > d) {
                    min = d;
                    coords[0] = marker.geometry.coordinates[0];
                    coords[1] = marker.geometry.coordinates[1];
                }

            };
            Map.on('load', () => {
                getRoute(coords)
            })
        }

    }, [pageIsMounted, stores, Map])
    async function getRoute(end) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        //mapbox/driving-traffic, mapbox/driving, mapbox/walking
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${move.value}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (Map.getSource('route')) {
            Map.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            Map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
        // get the sidebar and add the instructions
        const instructions = document.getElementById('instructions');
        const steps = data.legs[0].steps;

        let tripInstructions = '';
        for (const step of steps) {
            tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        }
        instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
            data.duration / 60
        )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
    }
    function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        for (const marker of stores.features) {
            /* Create a div element for the marker. */
            const el = document.createElement('div');
            /* Assign a unique `id` to the marker. */
            el.id = `marker-${marker.properties.id}`;
            /* Assign the `marker` class to each marker for styling. */
            el.className = 'marker';

            /**
             * Create a marker using the div element
             * defined above and add it to the map.
             **/
            new mapboxgl.Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(Map);

            /**
             * Listen to the element and when it is clicked, do three things:
             * 1. Fly to the point
             * 2. Close all other popups and display popup for clicked store
             * 3. Highlight listing in sidebar (and remove highlight for all other listings)
             **/
            el.addEventListener('click', (e) => {

                getRoute(marker.geometry.coordinates);
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createPopUp(marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(
                    `listing-${marker.properties.id}`
                );
            });
        }

    }

    /**
     * Add a listing for each store to the sidebar.
     **/

    function flyToStore(currentFeature) {

        Map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(
                `<h5>${currentFeature.properties.name}</h5><h7>${currentFeature.properties.address}</h7>
            <button id="my-button">Chi tiết!</button>`
            )
            .addTo(Map);
        const button = document.getElementById('my-button');
        if (button) {
            button.addEventListener('click', (event) => {
                event.preventDefault(); handleClickDetail(currentFeature.properties.name)
            });
        }
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Getting started with the Mapbox Directions API</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="map/styles.css" />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "body {margin: 0;padding: 0; } #map {position: absolute;top: 0;bottom: 0;width: 100%;}"
                    }}
                />
            </Head>

            <div id="map" />
            <div id="instructions"/>
            <div >
                <button id="button1" onClick={()=>handleClick("walking")}>🚶</button>
                <button id="button2" onClick={()=>handleClick("cycling")}>🚴</button>
                <button id="button3" onClick={()=>handleClick("driving")}>🛵</button>
                <button id="button4" onClick={()=>handleClick("driving-traffic")}>🚗</button>
            </div>

        </>
    )
}
