import express, { Request, Response } from "express";
const router = express.Router({ mergeParams: true });

router.route("/user-data")
.post((req: Request, res: Response) => {
    //TODO Update data
})
.get((req: Request, res: Response) => {
    //TODO Get user data
});

router.route("/meters")
.post((req: Request, res: Response) => {
    //TODO Add meter
})
.get((req: Request, res: Response) => {
    //TODO Get meters
})
.delete((req: Request, res: Response) => {
    // Delete meter
});

module.exports = router;