# API Documentation for meadarchive backend
### The backend api is a collection of endpoints that the frontend interacts with to manipulate and access the data it needs. Although the backend will attempt to identify the user and will restrict some data access if it cannot the authentication itself is handled by firebase.

## Authorization
Some routes are "public" routes and do not require for the server to identify the user in the quest. For example GET routes such as `/batch`. 

Some routes are "private" routes and require for the server to identofy the user from which the request came from, such as routes dealing with creating or modifying data.
Some private routes may further restric access to resources depending on which user is trying to manipulate the data. (See the documentation for specific routes down bellow)

For a request to be authorzied it needs to contain an `Authorization` header in the request. Where the header is the user auth token provided by firebase. The `authMiddleware` will the atempt to look this token up and try to identify the user. For private routes the request will be passed to `restrictAccessMiddleware`, which will block the request if the user was not identified. 

In the case that access was blocked all private end point will have the following responce:

```json
Status: 401
Response object: { "error": "Not Authorized" }
```
<br>

If an error occurs while attempting to identify the user in `authMiddleware`:
```json
Status: 500
Responce object: { "error": "Internal Server Error During Auth"}
```
<br>

If an error occurs  in `restrictAccessMiddleware`:
```json
Status: 500
Responce object: { "error": "Internal Server Error During Acess Verification" }
```


