# API Documentation for meadarchive backend
 The backend api is a collection of endpoints that the frontend interacts with to manipulate and access the data it needs. Although the backend will attempt to identify the user and will restrict some data access ff it cannot. The authentication itself is handled by firebase.

## Authorization
Some routes are "public" routes and do not require for the server to identify the user in the quest. For example GET routes such as `/batch`. 

Some routes are "private" routes and require for the server to identofy the user from which the request came from, such as routes dealing with creating or modifying data.
Some private routes may further restric access to resources depending on which user is trying to manipulate the data. (See the documentation for specific routes down bellow)

For a request to be authorzied it needs to contain an `Authorization` header in the request. Where the header is the user auth token provided by firebase. The `authMiddleware` will the atempt to look this token up and try to identify the user. For private routes the request will be passed to `restrictAccessMiddleware`, which will block the request if the user was not identified. 

In the case that access was blocked all private end point will have the following responce:


```json
{ "error": "Not Authorized" }
```
Status: `401` 

<br>

If an error occurs while attempting to identify the user in `authMiddleware`: 

```json
{ "error": "Internal Server Error During Auth"}
```
Status: `500`

<br>

If an error occurs  in `restrictAccessMiddleware`:
```json
{ "error": "Internal Server Error During Acess Verification" }
```
Status: `500`

<br>
<br>

## Endpoints
For all endpoints, if the server encounters an unexpected error it will set `status 500` and return a json object with parameter `error`. 

For example:

```json
{ "error": "Internal server error during creation of a recipe" }
```

<br>

### GET `/health`
This is a simple debug endpoint that is used to check that the server is running. More data might be added later. 

Requires authentication: `No`


Example responses:
```json
{ "status": "ok" }
```
Status: `200`

<br>

### GET `/whoami`
This endpoint returns user data based on user id. If user id is passed in the query string it will return data for that user. If no user id is passed but a valid authorization header is set then it will return data for the user that is identified by the token. Otherwise `null` is returned.

Requires authentication: `No`


| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `UserID`  | `string` | The id of the user to return data for | Optional

Example responses:
```json
{
    "userInfo": {
        "uid": "EGKwKPUpR3emxd6wsaW03WYXmJs1",
        "email": "test@gmail.com",
        "emailVerified": true,
        "displayName": "Eugene Levinson",
        "photoURL": "https://lh3.googleusercontent.com/a/AAcHTte4clHITbCIuXAC3FoCJgswgbs4cuh3UcqAldhPEd8Rzw=s96-c",
        "disabled": false,
        "metadata": {
            "lastSignInTime": "Mon, 24 Jul 2023 13:22:42 GMT",
            "creationTime": "Sun, 09 Jul 2023 19:06:55 GMT",
            "lastRefreshTime": "Mon, 24 Jul 2023 17:15:32 GMT"
        },
        "tokensValidAfterTime": "Sun, 09 Jul 2023 19:06:55 GMT",
        "providerData": [
            {
                "uid": "105004967643575426189",
                "displayName": "Eugene Levinson",
                "email": "test@gmail.com",
                "photoURL": "https://lh3.googleusercontent.com/a/AAcHTte4clHITbCIuXAC3FoCJgswgbs4cuh3UcqAldhPEd8Rzw=s96-c",
                "providerId": "google.com"
            }
        ]
    }
}
```



