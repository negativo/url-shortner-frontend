#Shooooort

Url Shortner Front-end


### Install project
```
npm install

cd proxy
npm install
```

### Build app
```
npm run build
```

### Local run

Run the proxy server
```
cd proxy
node server.js
```

Run the React app
```

npm run watch
```

then go to:

```
http://localhost:8080
```

By default Webpack runs local server on localhost:8080, you can change this config by adding --host yourip --port yourport within `package.json`:

 ```
 webpack-dev-server --hot --inline --progress --colors --history-api-fallback --host 127.0.0.1 --port 1337
 ```