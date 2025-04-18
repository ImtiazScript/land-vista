# Land Vista

Welcome to the Land Vista! This application allows users to browse lands and view details on an interactive map.

Vercel deployment: https://land-vista.vercel.app

## Features

- Browse lands on an interactive map.
- View details of each land, including name, price, and description.
- Add new lands with their details.

![Map](https://github.com/ImtiazScript/land-vista/raw/main/images/map.png)


## Technologies Used

- Frontend: React.js, React-Leaflet
- Backend: Node.js, Express.js, MongoDB
- Other libraries: Leaflet, Axios

## Getting Started

Prerequisites:
1. NodeJs should be installed on the system
2. MongoDB should be installed on the system and running on: mongodb://localhost:27017/

To run the application locally, follow these steps:

1. Clone the repository:
```bash
   git clone https://github.com/ImtiazScript/land-vista.git
```

2. Navigate to the project directory:
```bash
cd land-vista
```

3. Install dependencies for the frontend:
```bash
cd client
npm install
```

4. Install dependencies for the backend:
```bash
cd ..
npm install
```

5. Start the backend server:
```bash
npm devStart
```

6. Start the frontend development server:
```bash
cd client
npm start
```

7. Open your web browser and go to http://localhost:3000 to view the application.

Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.
