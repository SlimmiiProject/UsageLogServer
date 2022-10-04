import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        online: true,
        time: Date.now()
    })
});

module.exports = router;