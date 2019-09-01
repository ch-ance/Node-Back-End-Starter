# Node Back End Starter

The purpose of this repository is to provide a baseline starting point for a Node API with user authentication. I've found myself repeating some of these same basic steps each time I make a new API, and thought it would be helpful to have all of my best practices put into a convenient and ready to use repo.

The project is written entirely in **Typescript** - if you wish to use this starter kit you may elect to continue writing and compiling Typescript code, or you can simply move into the "build" folder and work directly with Javascript.

---

## API Documentation

#### ENDPOINTS

| Links                                         | Endpoints                       |
| --------------------------------------------- | ------------------------------- |
| [POST Registration](#post-registration)       | `/api/auth/register`            |
| [POST Login](#post-login)                     | `/api/auth/login`               |
| [GET User by ID](#get-user-by-id)             | `/api/users/id/:id`             |
| [GET User by Username](#get-user-by-username) | `/api/users/username/:username` |

---

### [POST] Registration

#### `/api/auth/register`

Payload: a JSON body object, containing a `user` object.

> **Required:** `username` & `password`

```json
{
  "user": 
        {
            "username": "user1",
            "password: "pass1",
            "email": "user@email.com",
            "first_name": "John",
            "last_name": "Smith"
        }
}
```

Returns:

```json
{
  "id": 1,
  "username": "user1",
  "email": "user@email.com",
  "first_name": "John",
  "last_name": "Smith"
}
```

---

### [POST] Login

#### `/api/auth/login`

> **Required:** `username` & `password`

```json
{
    "user": 
        {
            "username": "user1",
            "password": "pass1"
        }
}
```

Returns: 

```json
{
    "message": "Welcome user1",
    "token": a JSON web token
}
```
---

### [GET] User by ID

#### `/api/users/id/:id`
> Restricted endpoint, requires a valid json web token

```http
GET https://localhost:5000/api/users/id/1
```

Returns: 
```json
{
    "username": "user1",
    "email": "user@email.com",
    "first_name": "John",
    "last_name": "Smith"
}
```


---

### [GET] User by Username

#### `/api/users/username/:username`

> Restricted endpoint, requires a valid json web token

```http
GET https://localhost:5000/api/users/username/user1
```

Returns: 
```json
{
    "username": "user1",
    "email": "user@email.com",
    "first_name": "John",
    "last_name": "Smith"
}
```
---