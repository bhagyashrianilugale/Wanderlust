   mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
   
   const marker = new mapboxgl.Marker({color:"#fe434d" ,scale:"0.8"})
   .setLngLat(listing.geometry.coordinates)
   .setPopup(new mapboxgl.Popup({offset: 25})
   .setMaxWidth("300px")
   .setHTML(
      `<h4>${listing.location}</h4><p>Exact location will be provided after booking`
      )
      )
   .addTo(map);

   
      
