# jouerflux-mini

JouerFlux is an application for managing firewalls, policies, and firewall rules.

[Click here for README](./jouerflux/README.md)
## Features

- Manage firewalls (add, view, delete)
- Manage policies for each firewall (add, view, delete)
- Manage firewall rules for each policy (add, view, delete)
- API documentation via Swagger
- Dockerfile for easy run

## Prerequisites

- Docker

2. Run the application:
    ```sh
    $ docker build . --tag jouerflux-mini:latest
    $ docker run -it -p 80:5000 jouerflux-mini
    ```

## API Usage

The application exposes a RESTful API to manage firewalls, policies and firewall rules.
You can test the API via Swagger at `http://localhost/apidocs/#/`.

Access the application at `http://localhost/`.

### Endpoints

#### Firewalls

- `GET /firewalls`          : Retrieve the list of firewalls.
- `GET /firewalls/<id>`     : Retrieve a specific firewall.
- `POST /firewalls`         : Add a new firewall.
- `DELETE /firewalls/<id>`  : Delete a specific firewall.

#### Policies

- `GET /policies`           : Retrieve the list of policies.
- `POST /policies`          : Add a new policy to a firewall.
- `DELETE /policies/<id>`   : Delete a specific policy.

#### Rules

- `GET /rules`          : Retrieve the list of rules.
- `POST /rules`         : Add a new rule to a policy.
- `DELETE /rules/<id>`  : Delete a specific rule.
