# Rent My Tech Stuff API

## API URL

https://rent-my-tech-stuff.herokuapp.com

## API Documentation

### General Principles

#### Requests
This Web API follows the REST principles:
- resources are accessed using standard HTTPS requests
- HTTP requests are made to distinct API endpoints
- use HTTP verbs (GET, POST, PUT, DELETE, etc) based on the action taken

#### HTTP Methods and their roles
- GET - Retrieves existing resources
- POST - Creates a new resource
- PUT - Updates an existing resource
- DELETE - Deletes resources

## API Endpoints
- All data is returned in JSON format

**ALL of the following requests do NOT require an authorization token**

## Users

### POST /api/register
Required fields:
{
    "username": "UniqueUsername", (128 character max, unique)
    "firstname": "FirstName", (128 character max)
    "lastname": "LastName", (128 character max)
    "email": "email@email.com", (256 character max)
    "password": "password", (128 character max)
    "streetAddress": "12345 Street Name", (128 character max)
    "city": "City", (128 character max)
    "state": "State", (128 character max)
    "zipcode": "12345", (5 character max)
    "role": "owner or renter" (choose between owner or renter)
}
---
Returns:
    {
     "username": "UniqueUsername", 
     "firstname": "FirstName", 
     "lastname": "LastName", 
     "email": "email@email.com", 
     "password": "password", 
     "streetAddress": "12345 Street Name", 
     "city": "City", 
     "state": "State", 
     "zipcode": "12345", 
     "role": "owner or renter" 
    }

### POST /api/login
Required fields:
{
    "username": "UniqueUsername",
    "password": "password"
}
---
Returns:
 {
     "user": {
             "user_id: 1,
             "username": "UniqueUsername",
             "role": "owner or renter"
        },
        "token": "Authentication Token"
 }

\\

**All of the following requests REQUIRE an authorization token in the header**

## Renters

```Must have registered as renter to have access to the following requests```

### GET /api/
- Get all Items that are listed for rent

Returns and array of item objects:
[
    {
        "item_id": 1,
        "name": "Item Name",
        "category": "category",
        "price_per_day": "123",
        "rental_period": "Number of Days",
        "description": "Description of item",
        "user_id": 1
    },
]

### GET /api/renters/:id
- Get Item by the Item ID

Returns Item Object

### GET /api/renters/?filter=$nameORcategory&&location=$cityORstateORzipcode
- Get Item by Searching for Name or Category as well as by Location

Requires: 
replace $nameORcategory and $cityORstateORzipcode with desired search 
-- Make sure to keep the && operator

Returns and Array of Items that contain the desired search input

## Owners

```Must have registered as owner to have access to the following requests```

### GET /api/owners/:id
- Get All Owner Items by Owner ID

Returns an array of item objects that belong to that owner

### Get /api/owners/item/:id
- Get and Item by the Item ID

Returns Item Object

### POST /api/owners/item 
- Add Item

Required Fields:
{
    "name": "Item Name", (128 characters max)
    "category": "Category", (128 characters max)
    "price_per_day": "123", 
    "rental_period": "Number of Days", 
    "description": "Description", (300 characters max)
    "user_id": 6 (integer)
}

Returns New Item Object with item_id included.

### PUT /api/owners/item/:id
- Update Item By Item Id

Required Fields:
{
    "name": "Item Name", (128 characters max)
    "category": "Category", (128 characters max)
    "price_per_day": "123", 
    "rental_period": "Number of Days", 
    "description": "Description", (300 characters max)
}

Returns Updated Item Object with both item_id and user_id

### DELETE /api/owners/item/:id
- Delete Item

Returns the Deleted Item Object
