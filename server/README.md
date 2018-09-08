## Database
All JSON data is located in `server/data/`

This data can be changed and then reuploaded to the database

- Run `mongoimport --db=myDb --collection=<fileName> <fileName>.json`


### Export data
In server directory, run `mongodump`


### Load data into local database
In server directory, run `npm run data`
This will load the contents of the `dump` repository into the local MongoDb database
