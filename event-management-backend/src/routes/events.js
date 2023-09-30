const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/session");
const { createEvent, crateEventLogs, getEventsAll, getEvents, getEventLogsUserById, getEventById } = require("./../controllers/event");
const { upload } = require("./../helpers/handleStorage");

/**
 * path to create event
 */
router.post("/", upload.single("file"), createEvent);
router.get("/", getEventsAll);
router.get("/pagination", getEvents);
router.get("/:id", getEventById);

/**
 * Route to register user to event
 */
router.post("/event-logs", authMiddleware, crateEventLogs);
router.get("/my-events/:id", authMiddleware, getEventLogsUserById);

module.exports = router;