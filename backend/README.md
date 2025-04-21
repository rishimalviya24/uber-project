# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires a valid email, a first name (minimum 3 characters), a last name (minimum 3 characters), and a password (minimum 6 characters). Returns a JWT token and the created user object on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                      | Response Body Example                                  |
|-------------|--------------------------------------------------|--------------------------------------------------------|
| 201         | User registered successfully                     | `{ "token": "...", "user": { ...user fields... } }`    |
| 400         | Validation error or user already exists          | `{ "errors": [ ... ] }` or `{ "message": "User already exist" }` |

## Example Request

```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```


# User Login API

## Endpoint

`POST /users/login`

## Description

Authenticates a user with their email and password. Returns a JWT token and the user object on successful login.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                      | Response Body Example                                  |
|-------------|--------------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                                 | `{ "token": "...", "user": { ...user fields... } }`    |
| 400         | Validation error                                 | `{ "errors": [ ... ] }`                               |
| 401         | Invalid email or password                        | `{ "message": "Invalid email or password" }`           |

## Example Request

```sh
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

# User Profile API

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

## Authentication

- Header: `Authorization: Bearer <token>`
- or Cookie: `token=<token>`

## Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Success                    | `{ "user": { ...user fields... } }`  |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }` |

---

# User Logout API

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

- Header: `Authorization: Bearer <token>`
- or Cookie: `token=<token>`

## Responses

| Status Code | Description                | Response Body Example                      |
|-------------|----------------------------|--------------------------------------------|
| 200         | Logout successful          | `{ "message": "Logged out successfully" }` |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`       |




# Captain API Documentation

## 1. Register Captain

**Endpoint:**  
`POST /captains/register`

**Description:**  
Registers a new captain (driver) with personal and vehicle details. Returns a JWT token and the created captain object.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Field Requirements:**
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (number, required): Must be a number.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"bike"`, or `"auto"`.

**Responses:**

| Status | Description                        | Example Body                                      |
|--------|------------------------------------|---------------------------------------------------|
| 201    | Captain registered successfully    | `{ "token": "...", "captain": { ... } }`          |
| 400    | Validation or duplicate error      | `{ "errors": [ ... ] }` or `{ "message": "Captain already exist" }` |

---

## 2. Login Captain

**Endpoint:**  
`POST /captains/login`

**Description:**  
Authenticates a captain using email and password. Returns a JWT token and the captain object.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Field Requirements:**
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

**Responses:**

| Status | Description                        | Example Body                                      |
|--------|------------------------------------|---------------------------------------------------|
| 200    | Login successful                   | `{ "token": "...", "captain": { ... } }`          |
| 400    | Validation or authentication error | `{ "errors": [ ... ] }` or `{ "message": "Invalid email or password" }` |

---

## 3. Get Captain Profile

**Endpoint:**  
`GET /captains/profile`

**Description:**  
Returns the authenticated captain's profile. Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

**Authentication:**  
- Header: `Authorization: Bearer <token>`
- or Cookie: `token=<token>`

**Responses:**

| Status | Description                        | Example Body                                      |
|--------|------------------------------------|---------------------------------------------------|
| 200    | Success                            | `{ "captain": { ... } }`                          |
| 401    | Unauthorized                       | `{ "message": "Unauthorized" }`                   |

---

## 4. Logout Captain

**Endpoint:**  
`GET /captains/logout`

**Description:**  
Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

**Authentication:**  
- Header: `Authorization: Bearer <token>`
- or Cookie: `token=<token>`

**Responses:**

| Status | Description                        | Example Body                                      |
|--------|------------------------------------|---------------------------------------------------|
| 200    | Logout successful                  | `{ "message": "Logout successful" }`              |
| 401    | Unauthorized                       | `{ "message": "Unauthorized" }`                   |