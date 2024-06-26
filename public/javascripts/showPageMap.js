
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl(),'bottom-left');

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 30})
        .setHTML(
            `<h3>${(campground.title)}</h3><p>${(campground.location)}</p>`
        )
    )
    .addTo(map);


