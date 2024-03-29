# Website v1.0 for Photobox Peru 

## Disclaimer
At the time of this writing, it is not used by the client to handle customer orders. The end-product will contain:
* Deployment of React app and Node.js app 
* Cross-browser compatibility and responsive design for varying screen sizes
* Designed custom images
* Implementation of loading spinner for async operations that take time
* Implementation of the MercadoPago payment system, v1.0 implements Yape/Plin QR codes for payment
* Additional pages and content (FAQ, Who we are, implementation of Instagram posts)

<div align="center">
  <a href="https://github.com/luclongin/photobox-peru">
    <img src="readme/logo.jpg" alt="Logo" width="150" height="150">
  </a>
</div>

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), developed with **React.js** (using Redux.js) with a **MySQL database** and served with **Express** (Node.js framework).

## What is it?
[PhotoBox Peru](https://www.instagram.com/photobox.peru/) is a startup that receives orders from customers (photos and dimensions) via WhatsApp, prints them into physical framed pictures and ships them to the customer's address. 

The website's objective is to automatize the current work done manually via WhatsApp, eliminating effectively all direct contact with clients and image handling (and WhatsApp's default photo formatting). 

Once a customer enters the website, purchase options are presented to them via an interactive SPA alongside an interactive cart component. Once the customer has finished their purchase and uploaded/cropped their photos, the website asks for the customer's address, preferred delivery method and preferred payment method. The customer then pays following the selected payment method.

My client then receives this order in a private, automatically-updated page with order data, user data and uploaded photos.

## Technologies used
`Client-facing`:

* **Figma** for mocking and communicating with client before starting development.

`Front-end`: 

* **React framework** (using Redux store)
* **Material UI** component library for style
* Various **JS libraries** for image cropping, form handling (formik) and components (e.g carousel, loading spinners)
* **Axios** (promise-based HTTP Client) for communicating with backend API

`Back-end`: 

* **Express (Node.js framework)** for Routing (handling GET and POST requests with `front-end`) and to update a **MySQL database**
* **MySQL database** for storing user data and order data (uploaded images are kept in the Filesystem).
* **Sequelize** (promise-based Node.js ORM tool for the database)
* Various **JS libraries** to handle photo uploading and payment systems (e.g MercadoPago)

## View project
The project is divided into two folders, `frontend` and `backend`

To view the project, 
1. Clone the repo and move into project folder
   ```sh
   git clone https://github.com/luclongin/photobox-peru.git
   cd photobox-peru
   ```
2. Install Yarn packages of `frontend` folder and launch
   ```sh
   cd frontend
   yarn 
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser
5. Open [http://localhost:3000/kat](http://localhost:3000/kat) to access the **Admin Page (view only)** and view new orders/manage discounts. The database is hosted online but the backend is not - The database will not recognize your IP address in its Allowable Hosts registry and no data will therefore be shown. 
   
Enjoy!

## Contact

Luc Longin - luc.longin@gmail.com

Project Link: [https://github.com/luclongin/photobox-peru]([https://github.com/your_username/repo_name](https://github.com/luclongin/photobox-peru))
