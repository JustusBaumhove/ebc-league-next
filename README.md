
# eBc League

A web application serving a league system for an online gaming community.
The project is currently deployed on https://www.league.explicitbouncers.com/ 



## Tech Stack

**Client:** React, Material UI, Styled

**Server:** Node, Next.js

**Tests:** Cypress component testing


## API Reference

#### Get league
JSON response with rows of players that are in a certain league.
```http
  GET /api/league/[name]/[id]
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. league name |
| `id` | `integer` | **Required**. offset page id |

#### Get averages
JSON with average stats and the total number of players in a specific league.

```http
  GET /api/league/averages/[name]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. league name |

#### Get search
JSON with players that match a given input name.

```http
  GET /api/league/search/[name]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. search input |

#### Get server info
JSON with information about the servers gametype, current map, uptime and so on.

```http
  GET /api/league/server/info
```
