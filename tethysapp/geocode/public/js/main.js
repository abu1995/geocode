

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



accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejh2N21nMzAxMmQzMnA5emRyN2lucW0ifQ.jSE-g2vsn48Ry928pqylcg';



let latlon = L.control({ position: 'bottomleft' });
latlon.onAdd = function () {
    let div = L.DomUtil.create('div', 'well well-sm');
    div.innerHTML = '<div id="mouse-position" style="text-align: center"></div>';
    return div;
};

mymap.on("mousemove", function (event) {
    $("#mouse-position").html('Lat: ' + event.latlng.lat.toFixed(7) + ', Lon: ' + event.latlng.lng.toFixed(7));
});



let downloads = [];

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var content = e.target.result;
            
            const contentData = content.slice(
                content.indexOf('Y-Coord'),
                content.indexOf('[VERTICES]'),
            ).replace('Y-Coord', '').trim();


            const contentData2 = contentData.split('\n')

            let contentData3 = contentData2.map(content => content.trim().replace(/[	 ]+/g, ' ')
                .split(' '))

            console.log(contentData3);

            contentData3 = contentData3.map(item => item.map(val => parseInt(val)));



            var contentData4 = contentData3.map((value, index) => {
                latLng = mymap.layerPointToLatLng([value[1], value[2]]);

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



        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}



document.getElementById('uploadfile').addEventListener('change', readSingleFile, false);

document.getElementById('downloads').addEventListener('click', function () {
    console.log(downloads);

    var universalBOM = "\uFEFF";
    var a = window.document.createElement('a');
    a.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM + downloads.toString()));
    a.setAttribute('download', 'example.csv');
    window.document.body.appendChild(a);
    a.click();
});
