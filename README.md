# Fetch Rewards Frontend Exercise

This project is a single page application (SPA) with a user creation form.

## Description

The form takes 5 required inputs and submits the results via a POST request to an API endpoint.

### Features

- Feedback if submission was successful or failed
- Disabled submit button if all inputs not completed
- Occupation and State options returned by a GET request endpoint
- Lightly styled with Chakra Ui

## Built With

- React
- Chakra UI

## Screenshots
Feedback for success and error 

<img src="https://user-images.githubusercontent.com/16641038/202026763-08c722b2-aa58-4c69-9955-a615e7a9afba.gif"  width=40% height=40%> <img src="https://user-images.githubusercontent.com/16641038/202026869-2b3cd89f-ae14-4aa3-a98a-f506723f4cdb.JPG"  width=40% height=40%>

## Install

### `yarn` or `yarn install`

Install dependencies for the application

## Usage

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Reflection

This exercise was to quickly develop a frontend page with a user form with a set of minimum requirements.

There wasn't too many unexpected obstacles I encounted, but something that gave me initial difficulty is handling the structure of the form.

Some of the inputs are a bit verbose and repetitive with similar prop values. Refactoring could be implemented to generate the inputs based on the requirements of the form data. However I deicded to leave it as is for readiblity for the nature of the exercise.

I decided to use the React framework as it is what I am most comfortable with and allows me to easily manage state and hooks. Utilizing the `create-react-app` boilerplate allowed me minimize setup and quickly start development.

