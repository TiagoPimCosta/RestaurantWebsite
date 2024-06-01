# Restaurant Website

Welcome to RestaurantWebsite - where culinary delight meets seamless experience! Our restaurant website is designed to offer both the owner and the customers an effortless and enjoyable experience.

# Tech Stack

- Frontend: [Next.js](https://nextjs.org/) + [React](https://react.dev/) + [Typescript](https://www.typescriptlang.org/)
- Backend: [NestJs](https://nestjs.com/)
- Databases: [MySql](https://www.mysql.com/)

## Code Quality

- [Eslint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

## CI / CD

- [Github Actions](https://github.com/features/actions)

# Start Project

## 1. Configure Mysql Docker

Note: Verify that docker is installed:

> docker --version

1. Create a Mysql container

   > docker run -p 3307:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql/mysql-server:5.7

   With this comand the Docker container should be created with the name "my-mysql" in the port 3307 and with the mysql user and password as "root".
   At this point we can't connect to the docker mysql because of permissions, we will solve that now.

2. Edit user table in mysql docker

   > docker exec -it my-mysql /bin/bash

   > mysql -uroot -p -A

   This step will ask for the mysql password that was set in the command in step 1.

3. Update user settings

   1. Verify user settings

   > select user, host from mysql.user;

   2. Update root user settings
      This update enables the mysql to receive connections from outside the docker container with the 'root' user

   > update mysql.user set host='%' where user='root';

   3. Update the user privileges

   > flush privileges;

After this we can exit the mysql and docker container by writing 'exit' twice.
The mysql container is already setup, now we need to create a database inside the mysql docker container. With mysql Workbench we can connect to the mysql using the root user. Once you are inside we need to create a database to store the data, name it as you like.

## 2. Setup the environment variables

Setup a .env file inside the server folder with the same content of the .env.example

Example:

> DB_HOST=localhost
> DB_PORT=3307
> DB_USERNAME=root
> DB_PASSWORD=root
> DB_DATABASE= < Database Name >

## 3. Run the project

1. Run NestJs Server

   - Inside server folder:
     > npm install
     > npm run start:dev

2. Run NextJs Admin

   - Inside client folder:
     > npm install
     > npm run start

3. Run NextJs Client
   - Inside client folder:
     > npm install
     > npm run start
