import { DataProcessor } from "./../data/DataProcessing";
import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";

const router = express.Router({mergeParams: true});

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
  .route("/password")
  .put(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    const { password } = req.body;
    res.json(await DataProcessor.ChangePassword(userId, password));
  });

router
  .route("/device")
  .post((req: Request, res: Response) => {
    //TODO Add meter
  })
  .get(async (req: Request, res: Response) => {
    const userId : number = parseInt(req.params.userId);
    res.json(await DataProcessor.UserDevices(userId))
  })
  .delete((req: Request, res: Response) => {
    const userId : number = parseInt(req.params.userId);
    const { deviceId } = req.body;
  });


router.delete("/user", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    res.json(await DataProcessor.DeleteUser(userId));
});

module.exports = router;
