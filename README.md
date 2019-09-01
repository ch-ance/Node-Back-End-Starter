Node Back End Starter

The purpose of this repository is to provide a baseline starting point for a Node API with user authentication. I've found myself repeating some of these same basic steps each time I make a new API, and thought it would be helpful to have all of my best practices put into a convenient and ready to use repo.

The project is written entirely in Typescript - if you wish to use this starter kit you may elect to continue writing and compiling Typescript code, or you can simply move into the "build" folder and work directly with Javascript.

ENDPOINTS

POST "/api/auth/register"
Credentials sent inside of a "user" object within the request.
Required fields - username, password
Optional fields - email, first_name, last_name


POST "/api/auth/login"
Credentials sent inside of a "user" object within the request.
Required fields - username, password


GET "/api/users/id/:id"
Restricted endpoint, requires a valid json web token
:id is the user id
returns a user with all of their information, with the "password" field returned as "n/a"

GET "/api/users/username/:username"
Restricted endpoint, requires a valid json web token
:username is the user username
returns a user with all of their information, with the "password" field returned as "n/a"