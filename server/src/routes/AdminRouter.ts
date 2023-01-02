import { UserAccount } from './../data/entities/UserAccount';
import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";
import { DataProcessor } from "../data/DataProcessing";
import { Middleware } from "../utils/Middleware";
const router = express.Router();

router.use(SessionManager.loginRequired);
router.use(Middleware.requireAdminpermission);

/* A route that is used to get the logfile data. */
router.get("/logfile", async (req: Request, res: Response) => {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
  res.json(await DataProcessor.GetLogfileData(skip));
})

/* A route that is used to get a user. */
router.get("/user", async (req: Request, res: Response) => {
  const userId = req.query.userId ? parseInt(req.query.userId as string) : 0;
  res.json(await DataProcessor.getUser(undefined, userId, undefined));
})

/* A route that is used to get all the users. */
router.get("/allusers", async (req: Request, res: Response) => {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
  res.json(await DataProcessor.getAllUsers(skip));
})

/* A route that is used to get all the devices. */
router.get("/allDevices", async (req: Request, res: Response) => {
  const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
  res.json(await DataProcessor.getAllDevices(skip));
})


/* A route that is used to create and delete administrators. */
router
  .route("/account")
  .post(async (req: Request, res: Response) => {
    const { userId }: { userId: number } = req.body;
    res.json(await DataProcessor.createAdministrator(userId))
  }
  )
  .delete(async (req: Request, res: Response) => {
    const { userId }: { userId: number } = req.body;
    res.json(await DataProcessor.DeleteAdministrator(userId))
  }
  )

/* A route that is used to delete and create devices. */
router
  .route("/device")
  .delete(async (req: Request, res: Response) => {
    const { deviceId } = req.body;
    res.json(await DataProcessor.DeleteDevice(deviceId));
  })
  .post(async (req: Request, res: Response) => {
    const { deviceId, alias } = req.body;
    res.json(await DataProcessor.createDevice(deviceId, alias))
  })

router.put("/add-device-user", async (req: Request, res: Response) => {
  const { deviceId, userId } = req.body;
  res.json(await DataProcessor.AddDevicetoUser(userId, deviceId))
})

module.exports = router;