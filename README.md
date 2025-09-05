<a id="readme-top"></a>
<div align="center">
  <h1 align="center">YapYap</h3>

  <p align="center">
    An awesome chat app create with Nextjs 15!
    <br />
    <br />
  </p>
</div>
The app is live and available to try <a href="https://fullstack-chat-app-theta-three.vercel.app/">here</a> <br>
(sometime the websocket server not working well cause i use free tier when deploying on Render)
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
         <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
  </ol>
</details>


## About The Project

[product-screenshot]: ./showcase/demo.png
[![Product Name Screen Shot][product-screenshot]](./showcase/demo.png)

YapYap is a chat platform. 
Connect with friends, create private chat rooms, express yourself, and enjoy a beautiful, customizable dashboard. 
This project was built for learning and experimentation.

### Built With
[Next.js]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js
[Next-url]: https://nextjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/


* [![Next][Next.js]][Next-url]
* [![Node][Node.js]][Node-url]
* [![MongoDB][MongoDB]][MongoDB-url]

### Features
- **Private Rooms:** Create secure, invitation-only spaces for chatting.
- **Beautiful Dashboard:** Navigate your chats easily with a clean interface.
- **Add Friends:** Connect and grow your network.
- **Profile Editing:** Update your information and preferences.


## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/PhuocThinhkkk/YapYap-ChatApp.git
   ```
2. Install NPM packages 
   ```sh
    npm install

    cd ws
    npm install

   ```
### Environment Variables

This project requires environment variables for both the main app and the WebSocket server.
1. Root directory (.env)
   ```env
    MONGODB_URI=
    SESSION_SECRET=
    URL=http://localhost:3000
    NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3005

    # Pinata (for image uploads)
    PINATA_API_KEY=
    PINATA_API_SECRET=
    PINATA_JWT=
    NEXT_PUBLIC_PINATA_GATEWAY_URL=
   ```
2. WebSocket Server (ws) folder .env file

    ```env
    MONGODB_URI=
    DOMAIN_CHAT_APP=http://localhost:3000
    PORT=3005
    SESSION_SECRET=
    ```
### Usage
1. Start the WebSocket server
   ```sh
   cd ws
   node server.js
   ```
2. Start the main app
   ```sh
   cd ..
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The Nextjs app will run on [http://localhost:3000](http://localhost:3000) by default.
The WebSocket server will run on [http://localhost:3005](http://localhost:3005) by default.


