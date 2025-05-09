# Lost and Found Backend

## Overview

The Lost and Found Backend is a Node.js application designed to manage lost and found items. It provides RESTful APIs for adding, viewing, updating, and deleting items. The application uses MongoDB as its database and is built with Express.js.

## Features

- Add new found items.
- View all unclaimed items.
- View details of a specific item by ID.
- Update item details or mark them as claimed.
- Delete irrelevant or old entries.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lost-and-found-backend
  
2.Install dependencies:

   ```bash
   npm install
   ```

3.Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   ATLAS_URI=<your-mongodb-connection-string>
   ```

4.Start the server:

   ```bash
   npm start
   ```

5.The server will run on `http://localhost:5000` by default.

## API Endpoints

### Base URL

`http://localhost:5000/api/items`

### Endpoints

#### Add a New Item

- **POST** `/`
- **Description**: Add a new found item.
- **Request Body**:

  ```json
  {
    "itemName": "Wallet",
    "description": "Black leather wallet",
    "locationFound": "Library",
    "dateFound": "2025-05-01"
  }
  ```

- **Response**:

  ```json
  {
    "_id": "12345",
    "itemName": "Wallet",
    "description": "Black leather wallet",
    "locationFound": "Library",
    "dateFound": "2025-05-01",
    "claimed": false
  }
  ```

#### View All Unclaimed Items

- **GET** `/unclaimed`
- **Description**: Retrieve all unclaimed items.
- **Response**:

  ```json
  [
    {
      "_id": "12345",
      "itemName": "Wallet",
      "description": "Black leather wallet",
      "locationFound": "Library",
      "dateFound": "2025-05-01",
      "claimed": false
    }
  ]
  ```

#### View Item by ID

- **GET** `/:id`
- **Description**: Retrieve details of a specific item by its ID.

#### Update Item

- **PUT** `/:id`
- **Description**: Update item details or mark it as claimed.
- **Request Body** (example):

  ```json
  {
    "claimed": true
  }
  ```

#### Delete Item

- **DELETE** `/:id`
- **Description**: Delete an item by its ID.

## Folder Structure

```plaintext
lost-and-found-backend/
├── config/
│   └── db.js          # Database connection setup
├── controllers/
│   └── itemController.js # Business logic for item operations
├── models/
│   └── item.js        # Mongoose schema for items
├── routes/
│   └── itemRoutes.js  # API routes for items
├── server.js          # Main server file
└── package.json       # Project metadata and dependencies
```plaintext

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
