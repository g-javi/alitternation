## Database
All JSON data is located in `server/data/`

Run all commands in this directory (`server`)


### Load data into local database directly
1. Clear your existing data in MongoDB (drop `myDb`)
2. In server directory, run `npm run data`
    - this will load the contents of the `dump` repository into the local MongoDb database


### Update data locally and reupdate DB
If you want to update any data
1. Clear your existing data in MongoDB (drop `myDb` OR only drop the collection you want to update)
2. Update data
All JSON files `/data/*.json` can be changed directly but make sure to follow the same format of the file

3. Reupload data
- For `barcodes.json`, `instructions.json`, `litter.json`, and `users.json`:
    - Run `node dist/updateDb.js barcodes instructions litter users`
    - Or just include some of the collection names to only update those ones 

- For `bins.json`, `resourceRecoveryCentres.json`, and `survey.json`:
    - Run:
        - `mongoimport --db=myDb --collection=bins data/bins.json`
        - `mongoimport --db=myDb --collection=resourceRecoveryCentres data/resourceRecoveryCentres.json`
        - `mongoimport --db=myDb --collection=survey data/survey.json`

All data should now be in MongoDB again

3. Export data
Run `mongodump` (in server directory)
    - this should output a `dump` folder

4. Update Git
Commit and push your changes in both `/data` and `/dump`
