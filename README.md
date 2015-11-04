#WayneShorter
[ ![Codeship Status for willricketts/WayneShorter](https://codeship.com/projects/85236670-c4f6-0132-1e82-464f157e7e15/status?branch=master)](https://codeship.com/projects/74272)

WayneShorter, named after the legendary Jazz musician, is a simple URL shortening service modeled after popular services such as [goo.gl](http://goo.gl) and [bit.ly](http://bit.ly).

WayneShorter's headlining performance is made possible by the magic of Node.js and MongoDB.

---

##Routes

###GET /

Just a splash view of the legendary Wayne Shorter.

###POST /shorten
When passed URLencoded form data, WayneShorter creates and returns an 8th note sized link in the following way:
```
http://shrtr.in/:identifier
```
Go ahead and give it a good cURL'n!

`curl --data "payload=http://google.com" http://shrtr.in/shorten`

RESPONSE:

`{"payload":"http://google.com","identifier":"NksNRPPW","shortlink":"http://shrtr.in/NksNRPPW"}`

### GET /:identifier
When accessed, by its short identifier, the newly created shortlink whisks you away in a flurry of notes to the shortlink's destination.
