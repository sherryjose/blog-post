# BlogPost

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

Below is the behavior of the application:
1) Application lists out all posts with title and it's respective author name.
2) It displays 120 characters of its body and shows Read More link. 
3) On clicking the link, it shows full artilcle and also the comment section of respective post. 
4) There is a button to add comment. 
- On click of button, user is prompted to provide email and name. (Bootstrap modal is used for this)
- A check is done if user exists else a new user is created with provided name and email.**
- The user in kept in cookie and retrieved in order to add comments. (ngx-cookie-server is used for this)
- Once a comment is saved, it appears in the comment section of the post.
5) The app is made responsive using Bootstrap 4.

** To make the POST API work, a valid access token generated from https://gorest.co.in/ needs to be passed as Bearer token in code. If a valid token is not passed, 'Authentication failed' message is shown.

Tech used:
- Angular 10 with SCSS
- Bootstrap 4

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
