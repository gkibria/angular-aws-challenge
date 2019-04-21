# AngularAwsChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Task 1

Create a small web app with a single view. In this view a user should be able to manage shopping- or todo- any any other type of list. 

* It should have the following functionalities.
    * Add items to the list
    * Remove items
    * Edit items (change their name)
    * Store and load the list using local storage
* Use the following technologies
    * Angular 6 or later
    * Typescript
    * Local-Storage to store

## Task 2

Add a date and search functionality

* Search for items by name
* Assign a date to an item
* Search for items by date

## Task 3

Add a store online functionality to store the list at AWS S3

* Define a json format in which your list is stored
* Allow the user to load (download) the list from a AWS S3 bucket by entering the bucket url (using http)
* Allow the user to store (upload)  the list at a AWS S3 bucket by entering the bucket url (using http)

## Task 4

Use Appsync to store different lists which can be edited. Use the serverless framework to setup appsync

* Write a graphql schema which can be used to handle multiple lists for a user
* And more features of your personal choice

