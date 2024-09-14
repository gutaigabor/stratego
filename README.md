# Interview task for Scriptide Ltd.

## 📝 General overview:

The task is to implement an online playable (in the browser) version of the board game, Stratego. It should be playable by 2 players (2 different connections) via Websockets. You don't have to deploy your solution anywhere, we will try it on a local network via your instructions.

### ⌛ Time limit:

There is technically no time limit. We ask you to honestly track your working hours and attach them to this `README.md`. What is more important however is to solve the exercise with a solution that you feel represents your skillset the most and would be considerable in a production environment. The most important part of the exercise is the quality of the source code.

### 💬 Comments:

We encourage you to use comments richly throughout the codebase as you expect somebody else to comprehend your code as quickly as possible.

<br />

## 💻 Tech Stack:

### Frontend:

- Typescript
- React
- Socket.io
- Framer motion (if animating)

### Backend:

- Typescript
- NodeJS
- Socket.io (you can use it with NestJS if you prefer)

## 📝 Requirements:

The game should be fully implemented according [to the rules of the game](rules.md). Players should not be able to cheat. It should be random, which player gets to play the `red` army, and which gets to play the `blue`. If any of the players leave the game, it should end for the other player as well and the remaining player should get to the lobby again. There should be no more than 2 connected players at once. Actually, you can suppose there will never be more simultaneous connections than 2. You don't need to implement any matchmaking logic, rooms, or anything like that. The first 2 connections get to play, if either leaves, game is over.

There should be 4 phases of the app:

- lobby: waiting for opponent to join (only displayed for the first player when waiting for a second connection)
- preparation phase: placing your troops, the flag and the bomb
- gameplay: players alternating turns
- end of game: victory or defeat should be shown for the players, with a `Back to lobby` button that that puts the player to the lobby.

If there are two players in the lobby again, start a new match, and ignore any other incoming connections.

### Frontend:

- there should be a 10x10 Stratego board, including the lakes, viewed from the top (just like a chessboard in online chess)
- players should be able to click and move/attack pieces with their mouse/touchpad (just like in online chess)
- animations are not required (but feel free to implement them to show off your skills and you have time to dedicate)

### Backend:

- should be responsible for the game logic
- should communicate with the frontend via Websockets

<br />

<br />
<br />
<br />

## _🍀 We wish you good luck, hope you'll enjoy the exercise.🤞_

<br />
<br />
<br />

# Instructions to run your code

## Start application

```
docker-compose up

(after initial docker finishes, needs restart to work)

open localhost:3000 in a browser and in incognito browser, so 2 separate units

register in both instant (or login) - create 2 different accounts

if 'Ready' is clicked in both instances the game starts

rules.md contains how the game works
```

# Time spent on the project

- Learn Nestjs basics and read its documentation - 5 hours
- Planning the structure - 2 hours
- Setup project structure (React FE, Nestjs BE - REST auth, websocket, MongoDB, Docker) - 3 hours
- Authentication, authorization (login, register, JWT token usage) - 3 hours
- Setup FE (redux, routing, file structure, WS context) - 3 hours
- Lobby page (players waiting for each other) - 2 hours
- Setup page (create starter boards, waiting, minimal styling) - 3 hours
- Game page (Game functionality) - 5 hours
- Finalizing (WIN - LOSE, back to lobby) - 1 hour