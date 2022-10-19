import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    // TODO Save in database, send email to form submitter about his request
});

module.exports = router;