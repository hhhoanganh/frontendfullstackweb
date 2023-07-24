import { useState, useRef, useEffect } from 'react';

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import { useRouter } from 'next/router';

export default function Home() {
  const [Map, setMap] = useState();
  const [statusText, setStatusText] = useState(false);
  const [position1, setPosition1] = useState({
    "longitude": 0,
    "latitude": 0
  })
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const router = useRouter();
  const [located, setLocated] = useState();
  let namepush = router.query.namepush
  const [data, setData] = useState()
  useEffect(() => {
    fetchdata()
    geoFindMe()
  }, [])
  async function fetchdata() {
    const res = await fetch(`http://localhost:8080/coordinates/coordinate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      setData(json)
    }
  }
  let dataArr = []
  useEffect(() => {
    console.log(data)
    if (data) {
      if (typeof data == "object") {

        dataArr = data
      } else
        dataArr = JSON.parse(data)
    }
  },[data])

  let features = []
  useEffect(() => {
    if (dataArr) {
      for (const point of dataArr) {
        features.push(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [point.longtitude, point.latitude]

            },
            'properties': {
              'id':point.id,
              'phoneFormatted': point.phone,
              'phone': point.phone,
              'address': point.address,
              'name': point.name,
            }
          },

        )
      }
    }
  })



  mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1aG9hbmdhbmgyNyIsImEiOiJjbGptbjVob2IwaDJpM2Rtbm13dDVlZTBqIn0.bqJrzGvivb5XxZae9kWbag';

  const stores = {
    'type': 'FeatureCollection',
    'features': features
  };

  console.log(stores)

  /**
   * Assign a unique id to each store. You'll use this `id`
   * later to associate each point on the map with a listing
   * in the sidebar.
   */



  function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let res = { 'longitude': longitude, 'latitude': latitude }
      const json = JSON.stringify(res)
      const json1 = JSON.parse(json)
      setPosition1(json1)

    }

    function error() {
      setStatusText(false);
    }

    if (!navigator.geolocation) {
      setStatusText(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
      setStatusText(true);
    }
  }
  useEffect(() => {

    setPageIsMounted(true)
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [106.719874, 10.797499],
      zoom: 12.5,
      // scrollZoom: false
    });


    // Add zoom and rotation controls to the map.

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(map);

  }, []);

  useEffect(() => {
    if (pageIsMounted && stores && Map &&stores.features.length>1) {
      stores.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [position1.longitude, position1.latitude]
        },
        'properties': {
          'phoneFormatted': '(202) 331-3355',
          'phone': '2023313355',
          'name': 'Vị trí hiện tại',
          'address': 'Vị trí hiện tại của bạn',
          'city': 'Thành phố Hồ Chí Minh',

        }
      })

      Map.on('load', () => {
        try {
          Map.addSource('places', {
            'type': 'geojson',
            'data': stores
          });
        }
        catch (error) { }
        buildLocationList(stores);
        addMarkers();
      });
    }
  }, [pageIsMounted, stores, Map, stores.features]);
  /**
   * Add a marker to the map for every store listing.
   **/
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
        listing.classList.add('active');
      });
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.address}`;

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement('div'));
      details.innerHTML = `${store.properties.name}`;
      // if (store.properties.name) {
      //   details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
      // }

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener('click', function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
          }
        }
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
      });
    }
  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly
   * a given center point.
   **/
  function flyToStore(currentFeature) {

    Map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  /**
   * Create a Mapbox GL JS `Popup`.
   **/
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
  function handleClickDetail(e) {
    let name = e
    router.push({
      pathname: "/cinema/cinemalist",
      query: { name: name }
    })
  }
  function handleClick() {
    router.push("/filmcenter/filmlist")
  }
  function handleClickMap() {
    router.push("/mapdirection/")
  }

  useEffect(() => {
    if (pageIsMounted && stores && Map) {
      getPosition()
      fecthMap()
    }
  }, [pageIsMounted, stores, Map])
  function getPosition() {

  }

  function fecthMap() {
    for (const store of stores.features) {
      if (store.properties.name == namepush) {
        Map.flyTo({
          center: store.geometry.coordinates,
          zoom: 15
        });
        createPopUp(store);
      }
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Mapbox Store Location</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css' rel='stylesheet' />
        CSS Files
        <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />

        {/* CSS Just for demo purpose, don't include it in your project */}

      </Head>
      <main className={styles.main}>
        <div className='sidebar1'>
          <div className='heading display-flex'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>Our locations</div>
              <div>
                <button style={{ display: 'flex', alignItems: 'center', color: '#000000', borderRadius: 10, height: 40 }} onClick={handleClick}>Back to film list</button>
                <button style={{ display: 'flex', alignItems: 'center', color: '#000000', borderRadius: 10, height: 40 }} onClick={handleClickMap}>Đường đi</button>
              </div>

            </div>

          </div>
          <div id='listings' className='listings'></div>
        </div>
        <div id="map" className="map"></div>
      </main>
      <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js'></script>
    </div>
  )
}



