# e-commerce-ITI

This is a simple e-commerce website project, built with html, css, and vanilla js.
It uses json-server as a mock API for the products and users.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `json-server --watch db.json` to start the json-server
4. Open the project in your code editor and start a live server to view the website in your browser

## How to use

1. Go to `http://localhost:5500` in your browser (port may vary)
2. You can browse the products and add them to your cart
3. You can view your cart and checkout
4. You can register a new user or login with an existing one
5. You can view your order history

## Features

- Login and registration
- Product filteration by category
- Cart and checkout
- Order history
- Admin tools for products and categories
- Wish list

## Storage

- CATEGORY: The categories of the products
- PRODUCTS:
  - ID: The id of the product
  - Name: The name of the product
  - Image: The image of the product
  - Category: The category of the product
  - Price: The price of the product
  - Description: The description of the product
  - Stock Quantity: The quantity of the product in stock
  - Rating: the overall rating and its count
- USERS:
  - ID: The id of the user
  - Name: The name of the user
  - Email: The email of the user
  - Password: The password of the user
  - Is Admin: Whether the user is an admin or not
- ORDERS:
  - ID: The id of the order
  - Customer ID: The id of the customer
  - Product ID: The id of the product
  - Quantity: The quantity of the product
  - Status: The status of the order
  - Time Created: The time the order was created
  - Last Modified: The time the order was last modified
