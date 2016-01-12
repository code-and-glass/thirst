# Thirst
Thirst is a web application for cocktail rating and recomendations.

## Team

  - __Product Owner__: Artem Bakalov
  - __Scrum Master__: Igor Stefanco
  - __Development Team Members__: 
    - Ben Hejkal
    - Victoria Tapia

## Requirements

- Node ^0.12.7
- Npm ^2.14.2
- Neo4j 2.3.1

## Development

If neo4j is not installed follow instructions here: 
http://neo4j.com/docs/stable/server-installation.html
Note: Oracle Java 8 may be required for some systems

Create a local config.js file in the root directory with the following code and update the neo4j username and password.

```
module.exports = {
  neo4jAuth: {
    'user': 'YOUR_USERNAME_HERE',
    'password': 'YOUR_PASSWORD_HERE'
  },
  absolut: {
    'appId': '5761',
    'apiKey': '0f80b9b651e546ceb4fbe3ef9360c14a',
    'appSecret': 'd0eb2a88bedd4b3c8ad1e3b4f04a30fa'
  }
};
```

### Installing Dependencies

Run the following command in terminal:
```npm install```

Run local neo4j server:
```neo4j start```

Run local server with nodemon or npm:
```npm start```
```nodemon bin/www```

The application should be on http://localhost:3000/ .
The neo4j server should be on http://localhost:7474/ .

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines