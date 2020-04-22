

FINAL APP PROJECT – GEOCODE ( TETHYS APP )

Github link: https://github.com/abu1995/geocode

ABHISHEK AMALARAJ

21 APR 2020




Introduction:

The software EPANET is used to design drinking water distribution systems and to run simulations and chemical reactions on them. And so, it’s very useful for engineers who work with geo-spatial systems. The output of these files are called inp files. The app I am working on right now is a Tethys app and will be able to display the pipe networks to a map online with the option to move it around.

Current state:

I have been able to add features in the app which helps with the upload of inp files. The app runs with the help of Tethys – a python framework. The app also has the capability to load the pixel coordinates of the inp file onto the map as geographic markers and are connected by polylines which represent the pipes. The markers represent the nodes of the systems.

Challenges: 

A challenge I faced was to bring the systems to the scale of the current view. And leaflet loads the coordinates to the map and positions it to the top left corner of the current view. I faced this challenge by enabling a select option and dragging the markers to the current view.

Desired output:

I hope to enable access to hydroshare, a database for downloading and uploading files and storing the output information. I also, want to be able to download the loaded co-ordinates as a csv file.  


Post development :

The app has two features enabled to keep it simple and easy to understand. The features are to upload an inp file and to download the geo referenced co-ordinates.

The app helps process the inp files which is an end product of EPANET - a software used to design drinking water systems.

I had initially planned to add a back end support for my app to hydroshare and add features of uploading and downloading files directly from the hydroshare database. But I was unable to do so. However the project is in development stage and so a few features are still under progress. 

Geocode is meant to be geo-spatial tool for online EPANET services. And so, the points of the drinking water system can be brought on to a map and the nodes or points adjusted to being as functional as possible.

I have added an inp file to this folder just for your reference.
