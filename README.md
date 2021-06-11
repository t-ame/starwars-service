# Starwars Movie Service

A web service to list the names of Star Wars movies along with their opening crawls and character. Also, anonymous comments can also be added and retrieved.

<br>

**Base URL**: <br><br> <http://ec2-52-14-66-3.us-east-2.compute.amazonaws.com:8080/starwars>

<br>

### Content List
   
   - [Overview](#overview)
   - [Authentication](#authentication)
   - [Movies](#movies)
   - [Characters](#characters)
   - [Comments](#comments)

<br>

## Overview

Request and Response bodies are in JSON format

**ERROR Response**

Status Code: **500** 

>Response Body: 

``` json
{
    "error_message": "An error occured. Please try again later."
}
```

**SUCCESS Response**

Status Code: **200** 

>Response Body: As specified for each endpoint below

<br>

## Authentication

Request and Response bodies are in JSON format

**ERROR Response**

Status Code: **500** 

>Response Body: 

``` json
{
    "error_message": "An error occured. Please try again later."
}
```

**SUCCESS Response**

Status Code: **200** 

>Response Body: As specified for each endpoint below

<br>

## Movies

**Fetch list of movies with data**

>**GET** */movies* 

Response Body fields:
- **result**: A list containing the movie objects;

>- **title**: The title of this movie
>- **episode_id**: The episode id of this movie
>- **opening_crawl**: The opening crawl of this movie
>- **release_date**: The data the movie was released
>- **commentCount**: The total count of anonymous comments made on this movie
>- **comments**: The URL to fetch the comments for this movie
>- **charactersURL**: The URL to fetch the characters for this movie

- **count**: The total count of all the movies
- **self**: The URL to fetch all movies

>Response Body Sample: 

``` json
{
    "result": [
        {
            "title": "A New Hope",
            "episode_id": 4,
            "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            "release_date": "1977-05-25",
            "commentCount": 3,
            "comments": "/movies/4/comments",
            "charactersURL": "/movies/4/characters"
        }
    ],
    "count": 1,
    "self": "{baseURL}/movies"
}
```

<br>

## Characters

**Fetch list of characters in a movie**

>**GET** */movies/{episodeID}/characters* 

You can Filter by gender and sort by different parameters as described below.
<br>
If no specific sorting parameters are provided, it sorts by **Name** in **Ascending** order by default

>Query Parameters:

>- **filtergender**: Filter by gender. Options are: 

>>`male, female, hermaphrodite`

>- **sortfield**: Sort by field. Options are; 

>>`name, gender, height`

>- **sortdirection**: Sorting direction. Options are; 

>>`asc, desc`


Filtering by gender:

>**GET** */movies/{episodeID}/characters?filtergender=male* 

Sorting by a field (default field: **name**, default direction: **asc**):

>**GET** */movies/{episodeID}/characters?sortfield=height&sortdirection=desc*

Response Body fields:
- **result**: A list containing the character objects;

>- **name**: The name of this character
>- **height**: The height of this character
>- **mass**: The mass of this character
>- **hair_color**: The hair color of this character
>- **skin_color**: The skin color of this character
>- **eye_color**: The eye color of this character
>- **birth_year**: The birth year of this character
>- **gender**: The gender of this character
>- **homeworld**: The URL to fetch the data of the home world of this character

- **totalCount**: The total count of all characters in the specified movie
- **totalMatch**: The total count of all character that match the result from filtering
- **totalheighCm**: The total height in centimeters of all characters that are returned by the query
- **totalheighFt**: The feet part of the total height converted from centimeter to feet and inches
- **totalheighIn**: The inch part of the total height converted from centimeter to feet and inches
- **self**: The URL to fetch all characters 

>Response Body Sample: 

``` json
{
    "result": [
        {
            "name": "Wilhuff Tarkin",
            "height": 180,
            "mass": "unknown",
            "hair_color": "auburn, grey",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "64BBY",
            "gender": "male",
            "homeworld": "http://swapi.dev/api/planets/21/"
        }
    ],
    "totalCount": 18,
    "totalMatch": 1,
    "totalheighCm": 3066,
    "totalheighFt": "100",
    "totalheighIn": "7.09",
    "self": "{baseURL}/movies/4/characters"
}
```

<br>

## Comments

**Add New Anonymous Comment to a movie**
<br>A comment must not exceed 500 characters.

>**POST** */movies/{episodeID}/comments* 

Request Body fields:
- **comment**: A comment that is not more than 500 words

>Request Body Sample: 

``` json
{
	"comment": "A comment that is not more than 500 words"
}
```

Response Body fields:
- **comment**: An object containing the details of the inserted comment;

>- **commentId**: The ID generated for the inserted comment
>- **movieId**: The episode ID of the movie for which the comment was inserted
>- **comment**: The inserted comment
>- **ipAddress**: The IP address of the person that made the comment

- **self**: The URL to fetch this comment

>Response Body Sample: 

``` json
{
    "comment": {
        "commentId": 3,
        "movieId": 4,
        "comment": "A comment that is not more than 500 words",
        "ipAddress": "0:0:0:0:0:0:0:1"
    },
    "self": "{baseURL}/movies/4/comments/3"
}
```
<br>

**Fetch list of all anonymous comments made on a movie**

>**GET** */movies/{episodeID}/comments* 

Response Body fields:
- **result**: A list containing the comment objects

>- **commentId**: The ID for the comment
>- **movieId**: The episode ID of the movie for which the comment was inserted
>- **comment**: The comment
>- **date_time**: The date and time this comment was created
>- **ipAddress**: The IP address of the person that made the comment
>- **self**: The URL to fetch this particular comment

- **count**: The total count of all the comments under the specified movie
- **self**: The URL to fetch all comments in the specified movie

>Response Body Sample: 

``` json
{
    "result": [
        {
            "commentId": 2,
            "movieId": 4,
            "comment": "Another test comment",
            "date_time": "2020-10-15 02:13:25",
            "ipAddress": "0:0:0:0:0:0:0:1",
            "self": "{baseURL}/movies/4/comments/2"
        }
    ],
    "count": 1,
    "self": "{baseURL}/movies/4/comments"
}
```
<br>

**Fetch a comment by comment ID**

>**GET** */movies/{episodeID}/comments/{commentID}* 

Response Body fields:
- **comment**: An object containing the details of the comment;

>- **commentId**: The ID for the comment
>- **movieId**: The episode ID of the movie for which the comment was inserted
>- **comment**: The inserted comment
>- **date_time**: The date and time this comment was created
>- **ipAddress**: The IP address of the person that made the comment
>- **self**: The URL to fetch this particular comment

- **self**: The URL to fetch this comment

>Response Body Sample: 

``` json
{
    "comment": {
        "commentId": 1,
        "movieId": 4,
        "comment": "A test comment",
        "date_time": "2020-10-15 02:00:49",
        "ipAddress": "0:0:0:0:0:0:0:1"
    },
    "self": "{baseURL}/movies/4/comments/1"
}
```

