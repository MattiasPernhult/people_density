## Server
This is the server part for the solution. The server is written in *Node.js* and are using the *Express* framework and *socket.io* to handle communication with the web clients.

As storage we are using *MongoDB*.

#### Default endpoint
The root endpoint will show a heatmap over the people density in the Niagara building.

#### Chart endpoint
This endpoint is accessible by going to /chart. This will show charts over how many people that are in the Niagara building.

### Setting up everything

#### Installing MongoDB
First you need to have MongoDB installed to use this.

After you have installed MongoDB you need to open a Terminal window and type:
```bash
mongod
```
This will start your local MongoDB database.

#### Starting the server
After this you need to start the server and this is done by:
```bash
node src/listener.js
```

Then everything for the server is set up. So you can surf into *localhost:3000* or *localhost:3000/chart*

#### Inserting test data
To insert test data you need to start the golang file watcher. So head over to that directory and you will get further instructions.
