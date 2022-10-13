import express, { Request, Response } from "express";
const router = express.Router();

router.post("/create-profile", async (req: Request, res: Response) => {
    // Creat an account
});

router.delete("/delete-profile", async (req: Request, res: Response) => {
    // Delete account
});

module.exports = router;