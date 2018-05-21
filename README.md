# Film Demo Web app 
A film directory sample web app developped with an Angular 4 and SpringBoot

![screenshot home](https://github.com/thierryruiz/filmdemo/blob/master/film/misc/screenshot1.jpg?raw=true)

# Stack
  - Angular 4 / Angular Material
  - Spring Data Rest / Spring security
  - MySQL

# You will need
- Java 8+
- Node 8+
- Mysql 5+
- Maven 3+

# Fetch project
Clone project repository
```sh
git clone https://github.com/thierryruiz/filmdemo.git
```

# Setup and run backend

You need a Mysql 5+ instance running on your network or local host

- Create a "filmdb" MySql
- Edit database connection settings in film/src/main/resources/aplications.properties 

```sh
cd film
mvn clean install
```

And run the backend

```sh
 mvn spring-boot:run
```

# Setup and run front-end
```sh
cd film-front
npm i
ng serve
```

And then open your browser to [localhost:4200](http://localhost:4200)


# Limitations
No Unitary tests
Tested only on Chrome

# Dev stack
The project is aim to showcase a sample CRUD web application using Angular 4/5 and Spring Data Rest. 
It's a film directory database listing films actors and directors.

A simple data model is setup with Film, Actor and Director tables with many-to-many relationships between Film/Actor and Film/Director

![Schema database](https://raw.githubusercontent.com/thierryruiz/filmdemo/master/film/misc/schema.png)

A REST API in HATEOS format is generated with Spring Data Rest.

A JWT token based authentication based on Spring Security is in place to secure POST/UPDATE/DELETE REST requests. Only GET requests are available without authentication.

The front end is based on Angular 4 and uses Angular Material components. 



# Sceenshots

![screenshot film](https://github.com/thierryruiz/filmdemo/blob/master/film/misc/screenshot3.jpg?raw=true)

![screenshot film edit](https://github.com/thierryruiz/filmdemo/blob/master/film/misc/screenshot2.jpg?raw=true)







 
