# Starwars Movie Service

This web service provides a list of the names of Star Wars movies along with their opening crawls and character. Also, anonymous comments can also be added and retrieved to each movie.

<br>

### Content List
   
   - [Overview](#overview)
   - [Authentication](#authentication)
   - [Resources](#resources)
     - [Movies](#movies)
     - [Characters](#characters)
     - [Comments](#comments)

<br>

## Overview

All requests are made to endpoints beginning with:
<br> <http://starwars.api.com/v1>

JSON is the standard data format provided by this service.

<br>

Possible errors:


| Code  |  Error             | Description                                    |
| ------|--------------------|------------------------------------------------|
| 404   | Resource Not Found | The requested resource was not found.          |
| 500   | Server Error       | An error occured while processing the request. |

<br>

Example Error:

```
HTTP/1.1 500 Server Error
Content-Type: application/json; charset=utf-8

{
  "code": "SERVER_ERROR",
  "message": "Error message",
  "data": "Error stack"
}
```


## Authentication

The Star Wars movie service is a completely open API. No authentication is required to query and get data

<br>

## Resources

The API is RESTful and arranged around resources.

Typically, the first request you make should be to acquire movie details. This will give you access URLS you will need for subsequent requests.

<br>

### Movies

<br>

A Movie object is:


| Field           | Type   | Description                                   |
| ----------------|--------|-----------------------------------------------|
| movieId         | string | A unique identifier for the movie.            |
| name            | string | The movie's title.                            |
| openingCrawl    | string | The opening crawl of the movie.               |
| commentCount    | number | The total count of comments made on the movie |
| releaseDate     | string | The date the movie was released               |
| comments        | string | The URL to the movie's comments               |
| characters      | string | The URL to the movie's characters             |
| url             | string | The URL to access this movie                  |

<br>

#### Getting the list of all movie details
Returns details of the movies on which subsequent requests are made.

```
GET http://starwars.api.com/v1/movies
```

Example request:

```
GET /v1/movies HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a an array of Movie objects within an envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "movies": [
      {
         "movieId": "4e801a83-0d9a-4be0-9041-6c6c0203f74c",
         "name": "Attack of the Clones",
         "openingCrawl": "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared          their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
         "commentCount": 0,
         "releaseDate": "2002-05-16",
         "comments": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c/comments",
         "characters": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c/characters",
         "url": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c"
      }
   ],
   "totalCount": 1
}
```


#### Getting a single movie by ID
Returns details of the movie with the specified ID.

```
GET http://starwars.api.com/v1/movies/{movieId}
```

Example request:

```
GET /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9 HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a Movie object.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
   "movieId": "4e801a83-0d9a-4be0-9041-6c6c0203f74c",
   "name": "Attack of the Clones",
   "openingCrawl": "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared          their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
   "commentCount": 0,
   "releaseDate": "2002-05-16",
   "comments": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c/comments",
   "characters": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c/characters",
   "url": "/movies/4e801a83-0d9a-4be0-9041-6c6c0203f74c"
}
```

<br>

### Characters

<br>

A Character object is:


| Field           | Type   | Description                                   |
| ----------------|--------|-----------------------------------------------|
| characterId     | string | A unique identifier for the character.        |
| name            | string | The character's name.                         |
| height          | number | The character's height.                       |
| mass            | string | The character's mass                          |
| hairColor       | string | The character's hair color                    |
| skinColor       | string | The character's skin color                    |
| eyeColor        | string | The character's eye color                     |
| birthYear       | string | The character's year of birth                 |
| gender          | string | The character's gender                        |
| url             | string | The URL to access this character              |

<br>

#### Getting the list of all characters in a movie
Returns details of the characters within a specified movie.

The character list can be filtered by **gender** and sorted by either **name** or **height**.
If no specific sorting parameters are provided, it sorts by **Name** in **Ascending** order by default

<br>

```
GET http://starwars.api.com/v1/movies/{movieId}/characters?filterGender={gender}&sortBy={field}&sortDir={direction}
```

<br>

Query parameters:


| Parameter     | Description                                                                   |
| --------------|-------------------------------------------------------------------------------|
| filterGender  | filter by specified gender. Accepts; **male**, **female**, **hermaphrodite**  |
| sortBy        | Sort by specified field. Accepts; **name** or **height**                      |
| sortDir       | Sort in specified direction. Accepts; **ASC** or **DESC**                     |

<br> 

Character list MetaData:


| Field           | Type   | Description                                              |
| ----------------|--------|----------------------------------------------------------|
| totalCount      | number | Total count of all characters that match the criteria.   |
| totalHeightCm   | number | Total height of the characters in cm.                    |
| totalheightFtIn | string | Total height of the characters in feet and inches.       |

<br> 

Example request:

```
GET /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/characters HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a an array of Character objects within an envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "characters": [
      {
         "characterId": "bf3788ab-505c-4ac4-98f0-e88702431f03",
         "name": "Adi Gallia",
         "height": 184,
         "mass": "50",
         "hairColor": "none",
         "skinColor": "dark",
         "eyeColor": "blue",
         "birthYear": "unknown",
         "gender": "female",
         "url": "/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/characters/bf3788ab-505c-4ac4-98f0-e88702431f03"
      }
   ],
   "totalCount": 33,
   "totalHeightCm": 5575,
   "totalheightFtIn": "182ft and 10.88inches"
}
```
<br>

#### Getting a character in a movie
Returns details of the character with the specified ID.

<br>

```
GET http://starwars.api.com/v1/movies/{movieId}/characters/{characterId}
```

<br>

Example request:

```
GET /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/characters/bf3788ab-505c-4ac4-98f0-e88702431f03 HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a Character object.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
   "characterId": "bf3788ab-505c-4ac4-98f0-e88702431f03",
   "name": "Adi Gallia",
   "height": 184,
   "mass": "50",
   "hairColor": "none",
   "skinColor": "dark",
   "eyeColor": "blue",
   "birthYear": "unknown",
   "gender": "female",
   "url": "/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/characters/bf3788ab-505c-4ac4-98f0-e88702431f03"
}
```

<br>

### Comments

<br>

A Comment object is:


| Field         | Type   | Description                                 |
| --------------|--------|---------------------------------------------|
| commentId     | string | A unique identifier for the comment.        |
| comment       | string | The comment content.                        |
| ipAddress     | number | The IP address of the commenter.            |
| createdAt     | string | The date and time the comment was made      |
| url           | string | The URL to access this comment              |

<br>

#### Adding a new anonymous comment to a movie
Adds a new comment to a movie and returns details of the saved comment.

<br>

```
POST http://starwars.api.com/v1/movies/{movieId}/comments
```

Example request:

```
POST /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/comments HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8

{
   "comment": "A new anonymous comment."
}
```

The response is a Comment object.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
   "commentId": "e6e876e4-c05f-4537-b579-670bf4d5d85c",
   "comment": "A new anonymous comment.",
   "ipAddress": "::1",
   "createdAt": "Fri, 11 Jun 2021 19:58:46 GMT",
   "url": "/movies/6c140337-8d9c-4556-bbd4-1035ce8841e7/comments/e6e876e4-c05f-4537-b579-670bf4d5d85c"
}
```

<br>

#### Getting the list of all comments in a movie
Returns details of the comments within a specified movie.

<br>

```
GET http://starwars.api.com/v1/movies/{movieId}/comments
```

Example request:

```
GET /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/comments HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a an array of Comment objects within an envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "comments": [
      {
         "commentId": "e6e876e4-c05f-4537-b579-670bf4d5d85c",
         "comment": "An anonymous comment",
         "ipAddress": "::1",
         "createdAt": "Fri, 11 Jun 2021 19:58:46 GMT",
         "url": "/movies/6c140337-8d9c-4556-bbd4-1035ce8841e7/comments/e6e876e4-c05f-4537-b579-670bf4d5d85c"
      }
   ],
   "totalCount": 1
}
```

<br>

#### Getting a comment in a movie
Returns details of a comment within a specified movie.

<br>

```
GET http://starwars.api.com/v1/movies/{movieId}/comments/{commentId}
```

Example request:

```
GET /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/comments/e6e876e4-c05f-4537-b579-670bf4d5d85c HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8
```

The response is a Comment object.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
   "commentId": "e6e876e4-c05f-4537-b579-670bf4d5d85c",
   "comment": "An anonymous comment",
   "ipAddress": "::1",
   "createdAt": "Fri, 11 Jun 2021 19:58:46 GMT",
   "url": "/movies/6c140337-8d9c-4556-bbd4-1035ce8841e7/comments/e6e876e4-c05f-4537-b579-670bf4d5d85c"
}
```

<br>

#### Deleting a comment from a movie
Deletes a comment from a movie.

<br>

```
DELETE http://starwars.api.com/v1/movies/{movieId}/comments/{commentId}
```

Example request:

```
DELETE /v1/movies/08e730e1-5a02-4cc7-8617-61d513615aa9/comments/e6e876e4-c05f-4537-b579-670bf4d5d85c HTTP/1.1
Host: starwars.api.com
Accept: application/json
Accept-Charset: utf-8

```

The response is a Status stating if the delete operation was successful or not.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
   "success": true,
   "message": "Comment deleted successfully"
}
```
