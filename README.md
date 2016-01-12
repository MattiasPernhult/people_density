# People Density
A solution for visualize people density in Niagara building.

This is a project for the course Internet and Things and People, that aim to visualize people density in the Niagara
building at Malmö University.

This is a repository that contains all the solutions part, from hardware to the cloud.

#### server folder
This folder contains the server and the web clients. The server is an API.

#### file_watcher folder
This folder contains the file watcher that we are using which are watching a specific file and respond to those changes.

## Getting the source code
Stand in a directory where you want to add the project, then run following command.
``` bash
git clone https://github.com/MattiasPernhult/people_density.git
```
### Architecture
![Imgur](http://i.imgur.com/Wh8lNHG.png)

The raspberries will collect the data which is the MAC addresses and the signal strength. Raspberry 3 will then get this files from raspberry 1 and 2, the raspberry 3 will also use its own file and then do a merge and computation. 
After this it will update the result.txt file which the file watcher is listening on. The file watcher will register that a changes has occurred and then it will process the result.txt file and call the server that will insert the data into the database and also notify the clients that are subscribing for events.
