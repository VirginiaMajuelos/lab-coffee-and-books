function initMap() {

  const theBestCoffee = {
    lat: 40.3960025,
    lng: -3.7010481
  };

const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: theBestCoffee
  });


getPlaces(map)
    .then(places => {

      const markers = placesCoffee(map, places)
    })
    .catch(error => console.log(error))
}

function getPlaces() {
  return axios.get("/places/api")
    .then(response => response.data.places)}


function placesCoffee(map, places) {
  const markers = []


 places.forEach((place) => {
    const center = {
      lat: place.location.coordinates[1],
      lng: place.location.coordinates[0]
    };
    const newMarker = new google.maps.Marker({
      position: center,
      map: map,
      title: place.name
    });
    markers.push(newMarker);
  });

  // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
  
  return markers

}
