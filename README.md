#WayneShorter
WayneShorter, named after the legendary Jazz musician, is a simple URL shortening service modeled after popular services such as [goo.gl](http://goo.gl) and [bit.ly](http://bit.ly).

WayneShorter's headlining performance is made possible by the magic of Node.js and MongoDB.

---

##Routes
###POST /shorten
When passed URLencoded form data, WayneShorter creates and returns an 8th note sized link in the following way:
```
http://ws.is/:identifier
```

### GET /:identifier
When accessed, by its short identifier, the newly created shortlink whisks you away in a flurry of notes to the shortlink's destination.
