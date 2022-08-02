const express = require("express");
const server = express();
const helmet = require("helmet");
const actionRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(helmet());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectsRouter);

module.exports = server;
