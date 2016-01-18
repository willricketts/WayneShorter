#WayneShorter [![Build Status](https://travis-ci.org/willricketts/WayneShorter.svg?branch=master)](https://travis-ci.org/willricketts/WayneShorter)

![](http://i.imgur.com/6JBw8jW.png)

WayneShorter, named after the legendary Jazz musician, is a simple URL shortening service modeled after popular services such as [goo.gl](http://goo.gl) and [bit.ly](http://bit.ly).

WayneShorter's headlining performance is made possible by the magic of Node.js and MongoDB.

---

## Running Locally
To get WayneShorter running locally for a private performance, simply give him the starting cue:

Clone:
```
git clone git@github.com:willricketts/WayneShorter.git
```

Install deps:
```
npm install
```

Play that jazz:
```
npm start
```
---


## Environment Variables
```
db_user
db_host
db_pass
db
```


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

## Who the hell is Wayne Shorter?
[Only one of the greatest Jazz musicians ever!](https://en.wikipedia.org/wiki/Wayne_Shorter)
