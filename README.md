WeatherApp: A Node.js & React.js Weather Application
  This project is a weather application built using Node.js, Express.js, React.js, and hosted on Vercel. It fetches weather data from the OpenWeatherMap API and allows users to search for the current weather by entering the name of a city. Additionally, users can sign up or log in to access extended features, such as viewing the 5-day weather forecast.

Overview:
  WeatherApp allows users to search and view the weather of any city by fetching real-time data from the OpenWeatherMap API. With the help of JWT token authentication, users can sign up and log in to view extended weather data for up to 5 days. The application is built using Node.js on the backend, with Express.js handling server-side logic. The frontend is powered by React.js, making it a dynamic, modern web app hosted on Vercel.

Key Features:
1) Search for Weather:
  Users can enter the name of any city and get the current weather data for that location. The weather details are fetched from the OpenWeatherMap API and displayed dynamically on the page.
2) Extended 5-Day Forecast (Requires Login):
  Users can sign up or log in to access additional weather details, including a 5-day forecast for any city. This extended data is only accessible once the user has logged in using JWT-based authentication.
3) User Signup and Login:
  The app allows users to sign up and create an account. Once signed up, users can log in using their credentials. Upon successful login, a JWT token is generated, granting access to the 5-day weather forecast.
4) React.js & JWT Authentication:
  The frontend is built using React.js, and user authentication is handled using JWT tokens. This ensures secure access to the extended weather data after login.

Limitations:
1) Signup Issue on Vercel:
  One major limitation is related to the signup functionality. Since user data is stored in a JSON file, which is uploaded to GitHub, creating a new user does not work when the app is hosted on Vercel. The backend commands to create and store new user data via Node.js won't function properly in Vercel, as it cannot modify the JSON file stored on GitHub. This means users are unable to successfully sign up when using the app on the live Vercel link.
2) Media Query Limitations:
  The media query implementation in this project is not optimal. The layout may not adapt perfectly to all screen sizes, and the design could be improved for a better mobile experience.


Vercel Link:
You can view the live project here: https://weather-app-lake-nine-70.vercel.app/


Despite these limitations, this project was a great learning experience in using Node.js, React.js, and JWT authentication, along with handling real-time data fetching from external APIs. It provided insight into backend and frontend integration, although it could use some improvements in terms of responsiveness and deployment.
