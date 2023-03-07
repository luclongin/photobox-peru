# Website v1.0 for Photobox Peru 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), developed with React.js (using Redux.js) with a MySQL database and served with Express (Node.js).

## What is it
PhotoBox Peru is a startup that receives orders from customers (photos and dimensions), prints them into physical framed pictures and sends them to the customer's address.
The website's goal is to automatize the current work done manually via Whatsapp, eliminating effectively all direct contact with clients and image handling (and WhatsApp's default photo formatting). Once a customer enters the website, options are presented to them via an interactive SPA alongside an interactive cart component. Once the customer has selected all desired items to the cart, the website asks for address, delivery type and payment method to proceed to payment. My client then receives this order and all additional requested information in a private automatically-updated page.

## Tech stack
`Front-end`: React framework (using Redux store) and Material UI component library; various JS libraries for image cropping, form handling (formik) and components (e.g carousel); Axios (promise-based HTTP Client) to communicate with backend.
`Back-end`: Express (Node.js framework) for Routing (handling GET and POST requests) and communicating/updating with MySQL database; CORS, Sequelize for handling communication with database; various JS libraries to handle photo uploads and payment systems (e.g MercadoPago).

## How to view this project
The code is divided into two folders, `frontend` and `backend`

To view the project, `cd` into `frontend` and run `yarn start` and `cd` into `backend` and run `node server.js`.

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.
