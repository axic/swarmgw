# swarmgw

This library can be used to upload/download files to Swarm via https://swarm-gateways.net/ (or an optionally provided gateway).

**Note that while this is a convenient feature as of today, it may not be present indefinitely.**

## Library usage

```js
const swarmgw = require('swarmgw')(/* opts */)

// This should output the hash: 931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6
swarmgw.put('Hello from swarmgw!', function (err, ret) {
  if (err) {
    console.log('Failed to upload: ' + err)
  } else {
    console.log('Swarm hash: ' + ret)
  }
})

// This should output the content: Hello from swarmgw!
swarmgw.get('bzz-raw://931cc5a6bd57724ffd1adefc0ea6b4f0235497fca9e4f9ae4029476bcb51a8c6', function (err, ret) {
  if (err) {
    abort('Failed to download: ' + err)
  } else {
    console.log(ret)
  }
})
```

The `opts` above is a map of options:
- `gateway`: supply your own gateway URL, if not provided, it will use "swarm-gateways.net"
- `mode`: can be `http` or `https` (default is `https`), ignore if `gateway` is provided

## CLI usage

It can also be used via the command line if installed globally (`npm install -g swarmgw`). To see the help: `swarmgw --help`.

## License

MIT License

Copyright (C) 2016 Alex Beregszaszi
