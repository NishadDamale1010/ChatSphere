const express = require("express");
const router = express.Router();
const protectRoute = require("../middlewares/authmiddleware");

const {
    getUsersForSidebar,
    getMessages,
    sendMessage,
} = require("../controllers/messageController");

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
