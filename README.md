# TypingDNA-Hackathon-2020

Typing DNA Command Line Authenticator

## Inspiration
All the developers make use of the terminal while running the commands. And commands can be run by any user without verifying whether it was explicitly run by a specific user who was authenticated to do that or by anyone else. If anyone gets access to my laptop or a server the user will be able to run the command.

## What it does
The application uses Typing DNA authentication services to authenticate the commands that a user wants to run and if verified then it let them execute them. The user gets a simple popup application where he/she can add/edit commands that needs to be verified for the specific typing pattern that of the user.

## How I built it
It has a 6 component architecture that interacts with one another. The swift application creates a popup for ease of use which has an embedded application for angular. Angular application interacts with the Django backend which stores and persists the user information, command information, access tokens as well as interacts with the Typing DNA Apis and the PostgresSQL Database. The Swift Application interact with the Terminal and syncs up the commands that are being configured in the system.

## Challenges I ran into
First i thought of using the swift application's global listeners to get all typing events and pass it to the angular application which has the typing dna javascript library but the delay in the events form the computer created a abnormal typing pattern at the javascript library. Thus i changed a few bits and got the application working as seen in the demo.

## Accomplishments that I'm proud of
Learn about the typing DNA apis as it is an interesting project. I had heard about the concept when i was in my final year of engineering but it was good to see a product working in production and learning to interact with it. I also enjoyed completing the application in due time. I got to know about the competition on 10th of October thought of an Idea but wasn't sure would be able to complete it as i wasn't aware about swift development and there were a lot of loop holes i saw in the development lifecycle for my application.

## What I learned
Interacting with typing DNA. Swift application development. A little bit of bash scripting. How swift interact with the shell scripts and vis-a-versa.

## What's next for Typing DNA Command Line Authenticator
With some small changes in the code this can be deployed on the server and as a proper application for Mac Users. The same shell scripts and the backend can be reutilised for authenticating command requests on a server.

https://www.youtube.com/watch?v=J__W6lRfKM0
