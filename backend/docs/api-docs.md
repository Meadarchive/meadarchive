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

<br>
 
Example response:
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
Status: `200`

<br>

### GET `/recipe`
This endpoint returns a recipe object either based on the `recipeID` or `userID` passed in the query string. If using `userID` all recipes created by that user will be returned. If no parameters are passed then all recipes will be returned. If both are passed then the `recipeID` will be used.

Requires authentication: `No`

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `recipeID`  | `string` | The id of the recipe to be returned | Optional
| `userID`  | `string` | The id of the user whos recipe to return | Optional

<br>

Example response:
```json
{
    "msg": "Authorized",
    "recipes": {
        "7009363b-396b-4f65-89b7-f064e8c54ae9": {
            "recipeName": "My amazing recipe 4",
            "yeastType": "EC1118",
            "recipeSize": 15,
            "recipeDescription": "description\n\"\n\"\n\n_test_",
            "honeyTypes": [
                {
                    "amount": 2250,
                    "unit": "g",
                    "honey": "Cheap ass honey"
                },
                {
                    "amount": 750,
                    "unit": "g",
                    "honey": "Expensive ass honey"
                }
            ],
            "addons": [
                {
                    "amount": 5,
                    "unit": "g",
                    "addon": "Dried lavender"
                }
            ],
            "yeastAmount": 5,
            "liquids": [
                {
                    "amount": 10000,
                    "unit": "ml",
                    "liquid": "water"
                }
            ],
            "chemicals": [
                {
                    "amount": 5,
                    "unit": "g",
                    "chemical": "Bentonite"
                }
            ],
            "author": "MdI4Du5imwcExc7XiZvxDPwL8923",
            "recipeSizeUnit": "litre"
        }
    }
}

```
Status: `200`


<br>

### GET `/batch`
This endpoint returns the batch object including all the batch updates. Either `batchID` or `userID` can be used in the query. If both are passed in, then `batchID` is prioritised. If neither is used all batches will be returned.

Requires authentication: `No`

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `batchID`  | `string` | The id of the batch to be returned | Optional
| `userID`  | `string` | The id of the user whos batches to return | Optional

<br>

Example response:

```json
{
    "msg": "Authorized",
    "batches": {
        "06df3c1e-276c-42f4-942f-20aff58759dd": {
            "stage": "Bottled",
            "batchName": "My amazing batch 1",
            "dateStarted": "2023-07-15T12:34:56.000Z",
            "initialGravity": 1.09,
            "author": "EGKwKPUpR3emxd6wsaW03WYXmJs1",
            "equipment": [
                {
                    "item": "One Gallon Demijohn",
                    "quantity": 1
                },
                {
                    "item": "Airlock",
                    "quantity": 2
                }
            ],
            "water": "Rain water",
            "recipeID": "ffa48a50-4e9c-4b54-b9c4-810b90798af6",
            "updates": {
                "c92b098f-8bc5-41d6-ba63-6232e2e0529a": {
                    "updateDate": "2023-07-25T12:34:56.000Z",
                    "newGravity": 1.06,
                    "batchID": "06df3c1e-276c-42f4-942f-20aff58759dd",
                    "updateType": "gravity"
                },
                "38916889-ab62-4cc0-9700-2105cd2fa572": {
                    "updateDate": "2023-07-26T12:34:56.000Z",
                    "text": "TEST 1.",
                    "batchID": "06df3c1e-276c-42f4-942f-20aff58759dd",
                    "updateType": "text"
                }
            }
        }
    }
}
```
Status: `200`

<br>

### GET `/batch/update`
This endpoint returns **one** batch update object. The bot `updateID` and `batchID` must be passed in the query string. As the the `/batch` endpoint returns all updates for a batch, this endpoint exists only to simplify the process of retriving one specific update.

Requires authentication: `No`

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `updateID`  | `string` | The id of the update to be returned | Required
| `batchID`  | `string` | The id of the batch that the update belongs to | Required


<br>

Example response:
```json
{
    "msg": "Authorized",
    "batchUpdate": {
        "updateDate": "2023-07-26T12:34:56.000Z",
        "newGravity": 1.06,
        "batchID": "06df3c1e-276c-42f4-942f-20aff58759dd",
        "updateType": "gravity"
    }
}
```
Status: `200`

<br>

### POST `/recipe/create`
This endpoint creates a new recipe. The recipe object is passed in the request body.

Requires authentication: `Yes`

Body schema:

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `recipeName`  | `string` | Non unique human readable name for a recipe | Required
| `recipeDescription`  | `string` | Markdown supported description of the recipe | Required
| `liquids`  | `liquid` | Array of `liquid` used in the recipe | Required
| `yeastType`  | `string` | Name of the yeast used in the recipe | Required
| `yeastAmount`  | `number` | Amount of yeast used in the recipe | Required
| `honeyTypes`  | `honey` | Array of `honeys` used in the recipe | Required
| `addons`  | `addon` | Array of `addons` used in the recipe  | Optional
| `chemicals`  | `chemical` | Array of `chemicals` used in the recipe | Optional
| `recipeSize`  | `number` | Volume of the recipe | Required
| `recipeSizeUnit`  | `string` | Unit of the recipe size | Required

<br>

### `liquid` 

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `liquid`  | `string` | Name of the liquid | Required
| `amount`  | `number` | Amount of the liquid | Required
| `unit`  | `string` | Unit of the liquid | Required

### `honey` 

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `honey`  | `string` | Type of the honey | Required
| `amount`  | `number` | Amount of the honey | Required
| `unit`  | `string` | Unit of the honey | Required

### `addon` 

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `addon`  | `string` | Name of the addon (e.g. Lavander) | Required
| `amount`  | `number` | Amount of the addon | Required
| `unit`  | `string` | Unit of the addon | Required

### `chemical`

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `chemical`  | `string` | Name of the chemical (e.g. Bentonite) | Required
| `amount`  | `number` | Amount of the chemical | Required
| `unit`  | `string` | Unit of the chemical | Required



<br>


Example body:
```json
{
    "recipeName": "My amazing recipe 6",
    "recipeDescription": "description\n\"\n\"\n\n_test_",
    "liquids": [
        {
            "liquid": "water",
            "amount": 10000,
            "unit": "ml"
        }
    ],
    "yeastType": "EC1118",
    "yeastAmount": 5,
    "honeyTypes": [
        {
            "honey": "Cheap ass honey",
            "amount": 2250,
            "unit": "g"
        },
        {
            "honey": "Expensive ass honey",
            "amount": 750,
            "unit": "g"
        }
    ],
    "addons": [
        {
            "addon": "Dried lavender",
            "amount": 5,
            "unit": "g"
        }
    ],
    "chemicals": [
        {
            "chemical": "Bentonite",
            "amount": 5,
            "unit": "g"
        }
    ],
    "recipeSize": 15,
    "recipeSizeUnit": "litre"
}
```

<br>

#### Ok response:
```json
{"msg": "Authorized", "recipeID": "7009363b-396b-4f65-89b7-f064e8c54ae9"}
```
Status: `200`



#### Schema validation fail response:

```json
{
    "error": {
        "issues": [
            {
                "code": "too_small",
                "minimum": 1,
                "type": "array",
                "inclusive": true,
                "exact": false,
                "message": "Array must contain at least 1 element(s)",
                "path": [
                    "liquids"
                ]
            }
        ],
        "name": "ZodError"
    }
}
```

Status: `400`

<br>


### POST `/recipe/delete`

This endpoint deletes a recipe. The `recipeID` must be passed in the query string. User must be the author of the recipe to delete it.

Requires authentication: `Yes`

Body schema:

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `recipeID`  | `string` | The id of the recipe to be deleted | Required

<br>

Example body:
```json
{
    "recipeID": "7009363b-396b-4f65-89b7-f064e8c54ae9"
}
```

<br>

#### Ok response:
```json
{"msg": "Successfully deleted recipe with id: 7009363b-396b-4f65-89b7-f064e8c54ae9"}
```
Status: `200`

<br>

If no recipeID was passed:
```json
{"error": "Recipe ID is null or undefined"}
```

Status: `400`

<br>

If recipe doesn't exist:
```json
{"error": "No recipe with id '${RecipeID}' exists"}
```

Status: `400`

<br>



If user does not own the recipe:
```json
{"error": "User does not own this recipe"}
```

Status: `400`

<br>

### POST `/batch/create`

This endpoint creates a new batch. The batch object is passed in the request body.

Requires authentication: `Yes`

Body schema:

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `dateStarted`  | `string` | The date the batch was started | Required
| `batchName`  | `string` | The name of the batch | Required
| `author`  | `string` | The id of the user who created the batch | Required
| `equipment`  | `equipment` | An array of objects containing the equipment used in the batch | Required
| `water`  | `string` | The type of water used in the batch | Required
| `recipeID`  | `string` | The id of the recipe used in the batch | Required
| `stage`  | `string` | The stage of the batch | Required
| `initialGravity`  | `number` | The initial gravity of the batch | Required

<br>

### `equipment` 

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `item`  | `string` | The name of the equipment item | Required
| `quantity`  | `number` | The quantity of the equipment item | Required


<br>


Example Body:

```json
{
    "dateStarted": "2023-07-25T12:34:56.000Z",
    "batchName": "My amazing batch",
    "author": "E7N5xAZYApd9LZyuDP4HQTOAoih1",
    "equipment": [
        {
            "item": "One Gallon Demijohn",
            "quantity": 1
        },
        {
            "item": "Airlock",
            "quantity": 2
        }
    ],
    "water": "Evains water",
    "recipeID": "ffa48a50-4e9c-4b54-b9c4-810b90798af6",
    "stage": "Primary Fermentation",
    "initialGravity": 1.09
    
}
```

<br>

#### Ok response:
```json
{"msg": "Authorized", "batchID": "7009363b-396b-4f65-89b7-f064e8c54ae9"}
```
Status: `200`

<br>

#### Schema validation fail response:

```json
{
    "error": {
        "issues": [
            {
                "code": "too_small",
                "minimum": 1,
                "type": "array",
                "inclusive": true,
                "exact": false,
                "message": "Array must contain at least 1 element(s)",
                "path": [
                    "equipment"
                ]
            }
        ],
        "name": "ZodError"
    }
}
```

Status: `400`

<br>

#### Recipe not found response:

```json
{"error": "No recipe with id 'ffa48a50-4e9c-4b54-b9c4-810b90798af6' exists"}
```

Status: `400`

<br>

### POST `/batch/delete`

This endpoint deletes a batch. The `batchID` must be passed in the query string. User must be the author of the batch to delete it.

Requires authentication: `Yes`

Body schema:

| Parameter | Type | Description | Optional/Required |
| --- | --- | --- | --- |
| `batchID`  | `string` | The id of the batch to be deleted | Required

<br>

Example body:
```json
{
    "batchID": "7009363b-396b-4f65-89b7-f064e8c54ae9"
}
```

<br>


#### Ok response:
```json
{"msg": "Successfully deleted batch with id: '7009363b-396b-4f65-89b7-f064e8c54ae9'"}
```
Status: `200`

<br>

If no batchID was passed:
```json
{"error": "Batch ID is null or undefined"}
```
Status: `400`

<br>

If batch doesn't exist:
```json
{"error": "No batch with id '7009363b-396b-4f65-89b7-f064e8c54ae9' exists"}
```
Status: `400`

<br>

If user does not own the batch:
```json
{"error": "User does not own this batch"}
```
Status: `400`










