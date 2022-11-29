import { DataProcessor } from "./../data/DataProcessing";
import { responseEncoding } from "axios";
import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";

const router = express.Router();

router.use(SessionManager.loginRequired);

router
  .route("/user-data")
  .post((req: Request, res: Response) => {
    //TODO Update data
  })
  .get((req: Request, res: Response) => {
    //TODO Get user data
  });

router
  .route("/meters")
  .post((req: Request, res: Response) => {
    //TODO Add meter
  })
  .get((req: Request, res: Response) => {
    //TODO Get meters
  })
  .delete((req: Request, res: Response) => {
    // TODO Delete meter
  });


router.post("/delete-user", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    console.log(userId)
    res.json(await DataProcessor.DeleteUser(userId));
});

module.exports = router;
