SMART PARKING SYSTEM | Group 5 | arduino + web(nodejs)
Kim Terrence Quines 
Rodary Tabasan
Guiellie Keit Lorenzo
Jacqueline Mape
Noralyn Saludares


client:
    npm create vite@latest      //to create react.js

    npm install axios       //handle http request (get, post, delete, put)

    npm install react-router-dom        //React applications to handle navigation between different components or pages(without reloading pages)
   
    npm install -D tailwindcss postcss autoprefixer     //tailwind css for styling website
    npx tailwindcss init -p     //https://tailwindcss.com/docs/guides/vite

    npm i react-sweetalert2 //customize alert popop



server:
    npm init -y     //install package.json (node)

    npm install     //install node dependencies

    npm install express     //for routing, middleware management, and request handling
    npm install cors        //to make requests to a different domain
    npm install body-paser      //

    npm install nodemon     //for server auto reloader
    
    npm install mysql2      //for server to use mysql database
    

mysql:
    host: 'localhost',
    user: 'group5',
    password: 'group5',
    database: 'smart_parking'

    create user 'group5'@'localhost' identified by 'group5';
    create database smart_parking;
    create table parking_users 
        (id int auto_increment,
        primary key (id),
        username varchar(100),
        password varchar(100),
        firstname varchar(100),
        lastname varchar(100));
    grant all on smart_parking.parking_users to 'group5'@'localhost';

Scan Available Port:sudo chmod a+rw /dev/tty/USB0
sudo usermod -a -G dialout kcreates


edit:
denfended need inprovements
-filter parking slot 
-full automation (no guard)
-map 
-wallet