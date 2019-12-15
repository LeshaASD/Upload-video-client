# Video upload client. Test app.

## QuickStart

#### npm install

#### nest start 
#### nest start --watch //development mode

Authenticate before trying to upload video.

curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "password"}' -H "Content-Type: application/json"

get jwt 

http://localhost:3000/add to upload video. You can try with postman.
