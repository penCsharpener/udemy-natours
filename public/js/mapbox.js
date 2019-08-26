/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicGVuY3NoYXJwZW5lciIsImEiOiJjanpyeDA5c2kxOTlkM2xyMTU0aXhzdDY1In0.Sgs6hzRDxE9kESJFP31sxA';
  var map = new mapboxgl.Map({
    // container is an html element with the id #map or whatever you specify here
    container: 'map',
    style: 'mapbox://styles/pencsharpener/cjzrvaoii3ab61co0dv8pimbo',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 40
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
