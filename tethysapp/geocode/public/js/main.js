//let element=document.getElementById("hola");
//console.log(element);
//element.addEventListener("click", function(){ ; });

//let photo = document.getElementById("hola").files[0];  // file from input
//let req = new XMLHttpRequest();
//let formData = new FormData();

//formData.append("photo", photo);
//req.open("POST", '/upload/image');
//req.send(formData);


var mymap = L.map('map').setView([40.247070, -111.647921], 10);
L.esri.basemapLayer('NationalGeographic').addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 32,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWJoaXNoZWthbWFsMTgiLCJhIjoiY2s1eTVxNGExMmQ5MDNubjExaWY5MjdvbSJ9.3nmdjWZmUCDNyRdlPo5gbg'
}).addTo(mymap);

let UtahGis = L.tileLayer.wms('https://geoserver.hydroshare.org/geoserver/HS-08c6e88adaa647cd9bb28e5d619178e0/wms', {
    layers: 'Utah_Municipal_Boundaries', //Title name
    format: 'image/png', //depends on what you want to load in
    transparent: true,
}).addTo(mymap);


// var mymap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
//     maxZoom: 20,
//     attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// });


//L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18, 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='
//    id: 'mapbox/satellite-v9',
//    accessToken: 'pk.eyJ1IjoiYWJoaXNoZWthbWFsMTgiLCJhIjoiY2s1d3hmejQzMXp6bzNtbGI4dzRtZjg4eiJ9.O0MRDotH0-6q1Gg1Dkpsbg'
//}).addTo(mymap);

accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejh2N21nMzAxMmQzMnA5emRyN2lucW0ifQ.jSE-g2vsn48Ry928pqylcg';
//var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, { attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' });
//mymap.addLayer(mapboxTiles)


let latlon = L.control({ position: 'bottomleft' });
latlon.onAdd = function () {
    let div = L.DomUtil.create('div', 'well well-sm');
    div.innerHTML = '<div id="mouse-position" style="text-align: center"></div>';
    return div;
};

mymap.on("mousemove", function (event) {
    $("#mouse-position").html('Lat: ' + event.latlng.lat.toFixed(7) + ', Lon: ' + event.latlng.lng.toFixed(7));
});

// var lat,
//     lng;
// mymap.addEventListener('mousemove', function(ev) {
//     lat = ev.latlng.lat;
//     lng = ev.latlng.lng;
// });

// let drawnItems = new L.FeatureGroup().addTo(mymap);      // FeatureGroup is to store editable layers
// let drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems,
//         edit: false,
//     },
//     draw: {
//         polyline: false,
//         circlemarker: false,
//         circle: false,
//         polygon: false,
//         rectangle: true,
//     },
// });
// mymap.addControl(drawControl);
// mymap.on("draw:drawstart ", function () {     // control what happens when the user draws things on the map
//     drawnItems.clearLayers();
// });
// mymap.on(L.Draw.Event.CREATED, function (event) {
//     drawnItems.addLayer(event.layer);
//     L.Draw.Event.STOP;
//     getDrawnChart(drawnItems);
// });

// function getDrawnChart(drawnItems) {
//     // if there's nothing to get charts for then quit
//     let geojson = drawnItems.toGeoJSON()['features'];
//     if (geojson.length === 0 && chosenRegion === '') {
//         return;
//     };
// }


//Uploading a file 



// let photo = document.getElementById("image-file").files[0];
// let formData = new FormData();

// formData.append("photo", photo);
// fetch('/upload/image', {method: "POST", body: formData});



//Reading a txt file as a string

// function analyze(){
//     var f = new FileReader();

//     f.onloadend = function(){
//         console.log("success");
//     }
//     f.readAsText("cities.txt");
//  }
let downloads = [];

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var content = e.target.result;
            // var lines = e.target.result;

            //   console.log(content);

            // const linesdata = lines.slice(
            //     content.indexOf('Y-Coord'),
            //     content.indexOf('[VERTICES]'),
            //     ).replace('Y-Coord', '').trim();


            const contentData = content.slice(
                content.indexOf('Y-Coord'),
                content.indexOf('[VERTICES]'),
            ).replace('Y-Coord', '').trim();


            const contentData2 = contentData.split('\n')

            let contentData3 = contentData2.map(content => content.trim().replace(/[	 ]+/g, ' ')
                .split(' '))

            console.log(contentData3);

            contentData3 = contentData3.map(item => item.map(val => parseInt(val)));


            // let xMin = contentData3[0][1];
            // let xMax = contentData3[0][1];
            // let yMin = contentData3[0][2];
            // let yMax = contentData3[0][2];

            // contentData3.forEach(coordinate => {
            //     if (xMin > coordinate[1]) xMin = coordinate[1];
            //     if (xMax < coordinate[1]) xMax = coordinate[1];
            //     if (yMin > coordinate[2]) yMin = coordinate[2];
            //     if (yMax < coordinate[2]) yMax = coordinate[2];
            // });


            // // const xLength = xMax - xMin;            var contentData4 = contentData3.map((value, index) => {
            //     latLng = mymap.containerPointToLatLng([value[1], value[2]]);
            //     L.marker(latLng).addTo(mymap);
            //     return [latLng.lat, latLng.lng]

            // });



            // L.polyline(contentData4).addTo(mymap);




            // function connectDots(contentData2) {
            //     var features = contentData2.features,
            //         feature,
            //         c = [],
            //         i;

            //     for (i = 0; i < features.length; i += 1) {
            //         feature = features[i];
            //         // Make sure this feature is a point.
            //         if (feature.geometry === "Point") {

            // // const yLength = yMax - yMin;

            // let points = [];

            // contentData3 = contentData3.map(coordinate => {
            //     const xVal = xMin < 0 ? coordinate[1] + Math.abs(xMin) : coordinate[1];
            //     const yVal = yMin < 0 ? coordinate[2] + Math.abs(yMin) : coordinate[2];
            //     return [coordinate[0], xVal, yVal]
            // });

            // xMin = contentData3[0][1];                                   
            // xMax = contentData3[0][1];
            // yMin = contentData3[0][2];
            // yMax = contentData3[0][2];

            // contentData3.forEach(coordinate => {
            //     if (xMin > coordinate[1]) xMin = coordinate[1];
            //     if (xMax < coordinate[1]) xMax = coordinate[1];
            //     if (yMin > coordinate[2]) yMin = coordinate[2];
            //     if (yMax < coordinate[2]) yMax = coordinate[2];
            // });

            // contentData3.forEach(coordinate => {
            //     points.push({
            //         top: Math.abs(Math.round(coordinate[2] * 100 / (yMax + (yMax / 10)))),
            //         left: Math.abs(Math.round(coordinate[1] * 100 / (xMax + (xMax / 10))))
            //     });
            // });

            // points = points.map(point => ({
            //     left: point.left === 0 ? 10 : point.left,
            //     top: point.top === 0 ? 10 : point.top,
            // }))

            // console.log(points);
            // const markers = document.getElementById('markers');
            // markers.innerHTML = ""
            // points.forEach(point => {
            //     const marker = document.createElement('img');
            //     marker.src = "https://static.thenounproject.com/png/9093-200.png";

            //     marker.style = `position: absolute; top: ${point.top}%; left: ${point.left}%; width: 20px;`;
            //     console.log(point.top, point.left);

            //     markers.appendChild(marker);


            // });

            // var geojsonFeature = {
            //     "type": "Feature",
            //     "properties": {},
            //     "geometry": {
            //         "type": "Point",
            //         "coordinates": [contentData3]
            //     }
            // };

            // contentData3 = [
            //     [-109.05, 41.00],
            //     [-102.06, 40.99],
            //     [-102.03, 36.99],
            //     [-109.04, 36.99],
            //     [-109.05, 41.00]
            // ]

            // contentData3 = contentData3.map((value, index) => {

            //     latLng = mymap.containerPointToLatLng([value[1], value[2]]);
            //     L.marker(latLng).addTo(mymap);
            // });




            var contentData4 = contentData3.map((value, index) => {
                latLng = mymap.layerPointToLatLng([value[1], value[2]]);
                // if (index == 0) {
                //     mymap.setView(latLng)
                // }
                // L.marker(latLng).addTo(mymap);
                onMapClick(latLng);
                return [latLng.lat, latLng.lng]

            });

            downloads = contentData4;



            L.polyline(contentData4).addTo(mymap);

            function onMapClick(latLng) {
                marker = new L.marker(latLng, { draggable: 'true' });
                let previousLatLng = [];
                marker.on('dragstart', function (event) {
                    //alert('drag ended');
                    var marker = event.target;
                    previousLatLng = marker.getLatLng()
                });
                marker.on('dragend', function (event) {
                    var marker = event.target;
                    var position = marker.getLatLng();
                    marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
                    mymap.panTo(new L.LatLng(position.lat, position.lng))
                    clearMap();
                    contentData4 = contentData4.map(value => {
                        if (value[0] == previousLatLng.lat && value[1] == previousLatLng.lng) {
                            return [position.lat, position.lng];
                        }
                        return value;
                    })
                    downloads = contentData4;
                    L.polyline(contentData4).addTo(mymap);
                });

                mymap.addLayer(marker);
            };
            console.log(mymap._layers);

            function clearMap() {
                for (i in mymap._layers) {
                    if (mymap._layers[i]._path != undefined) {
                        try {
                            mymap.removeLayer(mymap._layers[i]);
                        }
                        catch (e) {
                            console.log("problem with " + latLng + mymap._layers[i]);
                        }
                    }
                }
            }



            // function connectDots(contentData2) {
            //     var features = contentData2.features,
            //         feature,
            //         c = [],
            //         i;

            //     for (i = 0; i < features.length; i += 1) {
            //         feature = features[i];
            //         // Make sure this feature is a point.
            //         if (feature.geometry === "Point") {
            //             c.push(feature.contentData3);
            //         }
            //     }
            //     return c;
            // }

            // L.polyline(connectDots(contentData3)).addTo(mymap);

            // contentData3 = contentData3.map((value, index) => {
            //     console.log(value)
            //     return {
            //         "type": "Feature",
            //         "properties": {
            //             name: index,
            //             show_on_map: true,
            //         },
            //         "geometry": {
            //             "type": "Point",
            //             "coordinates": [lat + value[1], lng + value[2]],
            //         }
            //     };

            // });

            // console.log(contentData3);

            // function onEachFeature(feature, layer) {
            //     var popupContent = "<p>I started out as a GeoJSON " +
            //         feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

            //     if (feature.properties && feature.properties.popupContent) {
            //         popupContent += feature.properties.popupContent;
            //     }

            //     layer.bindPopup(popupContent);
            // }

            // L.geoJSON({ type: 'content', features: contentData3 }, {

            //     style: function(feature) {
            //         return feature.properties && feature.properties.style;
            //     },

            //     onEachFeature: onEachFeature,

            //     pointToLayer: function(feature, latlng) {
            //         console.log(latlng)
            //         return L.circleMarker(latlng, {
            //             radius: 8,
            //             fillColor: "#ff7800",
            //             color: "#000",
            //             weight: 1,
            //             opacity: 1,
            //             fillOpacity: 0.8
            //         });
            //     }
            // }).addTo(mymap);
            //    contentData3.forEach(content => {
            //     var marker = L.marker([content[1], content[2]]).addTo(mymap);
            //    });

            //Will be useful to draw a polygon using the coordinates on a map
            //    var polygon = L.polygon([
            //     [51.509, -0.08],
            //     [51.503, -0.06],
            //     [51.51, -0.047]
            // ]).addTo(mymap);   


        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}


// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object

//     // files is a FileList of File objects. List some properties.
//     var output = [];
//     for (var i = 0, f; f = files[i]; i++) {
//       output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                   f.size, ' bytes, last modified: ',
//                   f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                   '</li>');
//     }
//     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//   }

document.getElementById('uploadfile').addEventListener('change', readSingleFile, false);

document.getElementById('downloads').addEventListener('click', function () {
    console.log(downloads);
    // var csv = 'ı,ü,ü,ğ,ş,#Hashtag,ä,ö';
    var universalBOM = "\uFEFF";
    var a = window.document.createElement('a');
    a.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM + downloads.toString()));
    a.setAttribute('download', 'example.csv');
    window.document.body.appendChild(a);
    a.click();
});
// reading a string from a text file


// $('.Content').html().match(/^=(.*)$/gm); 


//Overlay
// function on() {
//     document.getElementById("overlay").style.display = "block";
//   }

//   function off() {
//     document.getElementById("overlay").style.display = "none";
//   }

// var someFeatures = [{
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "show_on_map": true
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// }, {
//     "type": "Feature",
//     "properties": {
//         "name": "Busch Field",
//         "show_on_map": false
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.98404, 39.74621]
//     }
// }];

// L.geoJSON(someFeatures, {
//     filter: function(feature, layer) {
//         return feature.properties.show_on_map;
//     }
// }).addTo(mymap);