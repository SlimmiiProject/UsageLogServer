import {
  Box,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Stack,
  Button,
  IconButton,
  Slide,
  Dialog,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdminUtil, userData } from "../../util/AdminUtil";
import { I18n } from "../../util/language/I18n";
import { IOUtil } from "../../util/IOUtil";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import {TransitionProps} from "@mui/material/transitions"
export const AllUsers = (): JSX.Element => {
  const [users, setusers] = useState<userData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
  const [render, setRender] = useState<boolean>(false);
  const [pages,setPages] = useState<number>(10)
  const [page,setPage]=useState<number>(1)
  const [openCreateDialog,setOpenCreateDialog] = useState<boolean>(false);
  const [fname,setfname]=useState<string>("")
  const [lname,setlname] = useState<string>("")
  const [mail,setmail] = useState<string>("")
  const [landCode,setLandCode] = useState("+32")
  const [phnumber,setphnumber] = useState<number>(0)
  const [pass, setpass] = useState<string>("") 
  const [vpass,setvpass]=useState<string>("")
  const [createResult,setCreateResult]=useState<boolean>(false) 
  const [passwordisValid,setpasswordisValid]=useState<boolean>(false)
  useEffect(() => {
    const controller = new AbortController();
    requestAllUsers(controller)
    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    setRender(false);
  }, [render])

const handlePageChange=(event:React.ChangeEvent<unknown>,page:number)=>{
  setPage(page)
}
const requestAllUsers = (controller:AbortController)=>{
  setisloading(true);
  AdminUtil.getUsers(controller, page-1).then((result) => {
    setusers(result.data);
    setPages(result.pages)
    setisloading(false);
  });
}
const HandleResetRequest = (email:string) =>{
  IOUtil.requestPasswordReset(email)
}
const CreateUser = ()=>{
  if(fname.length>0&&lname.length>0&&landCode&&phnumber?.toString().length>0&&pass.length>0&&vpass.length>0){
  HandleClickCloseCreateDialog();
  IOUtil.registerUser(fname,lname,mail,landCode+phnumber?.toString(),pass,vpass,(result)=>{
    setCreateResult(result.succes)
  })
  setfname("")
  setlname("")
  setphnumber(0)
  setpass("")
  setvpass("")

}
  
}
const HandleClickOpenCreateDialog=()=>{
  console.log("open triggered")
  setOpenCreateDialog(true);
}
const HandleClickCloseCreateDialog=()=>{
  console.log("close triggered")
  setOpenCreateDialog(false);
}
function passMatch():boolean{
  if(pass === vpass && pass.length>0)return true;
  return false;
}

  return (
    <>
      <Box
        className="flexbox"
        style={{
          margin: "auto",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          backgroundColor: "rgba(0,0,0,0.0)",
          height: "fit-content",
          width: "fit-content",
        }}
      >
        <h2>{I18n.t("allUsers.List")}</h2>
        <TableContainer component={Paper} style={{ borderWidth: 5, }}>
          <Table sx={{ minWidth: 650 }} arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{I18n.t("allUsers.tableId")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableEmail")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableName")}</TableCell>
                <TableCell>{I18n.t("allUsers.tablePhone")}</TableCell>
                <TableCell>Request Reset</TableCell>
                <TableCell>{I18n.t("allUsers.tableAdmin")}</TableCell>
                <TableCell>
                  <Button endIcon={<AddCircleIcon/>} color="success" onClick={HandleClickOpenCreateDialog}>
                  {I18n.t("allUsers.tableCreateUser")}
                  </Button>
                  <Dialog onClose={HandleClickCloseCreateDialog} open={openCreateDialog} maxWidth="lg" >
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogContent sx={{display:"flex",flexDirection:"inherit", rowGap:".5rem"}}>
                      <DialogContentText>
                        Create a new user in the database.<br></br>
                        Make sure all required fields are filled in.
                      </DialogContentText>
                      <TextField label="First name" required onChange={(e)=>setfname(e.target.value)}/>
                      <TextField label="Last name" required onChange={(e)=>setlname(e.target.value)}/>
                      <TextField label="email" required onChange={(e)=>setmail(e.target.value)}/>
                      <Box sx={{display:"inherit",}}>
                      <Select labelId="Land Code" value={landCode} onChange={(e:SelectChangeEvent)=>{setLandCode(e.target.value as string)}}>
                        <MenuItem value="+31">+31</MenuItem>
                        <MenuItem value="+32">+32</MenuItem>
                        <MenuItem value="+33">+33</MenuItem>
                        <MenuItem value="+49">+49</MenuItem>
                      </Select>
                      <TextField label="Phone Number" required type="number" onChange={(e)=>setphnumber(parseInt(e.target.value))}/>
                      </Box>
                      <TextField label="Password" required onChange={(e)=>setpass(e.target.value)}/>
                      <TextField label="Verify password" required onChange={(e)=>{
                        setvpass(e.target.value);
                        setpasswordisValid(passMatch());}}/>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={HandleClickCloseCreateDialog} color="error">Cancel</Button>
                      <Button onClick={CreateUser} disabled={!passMatch} color="success">Save</Button>
                    </DialogActions>
                  </Dialog>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isloading ? (
                users.map((user) => (
                  <TableRow
                    key={user.userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.userId}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                     <Button onClick={()=>{HandleResetRequest(user.email)}}
                     endIcon={<SettingsBackupRestoreIcon/>}>Password reset</Button></TableCell>
                    <TableCell align="right">
                      {user.isAdmin ? (
                        <Chip
                          label={I18n.t("allUsers.tableChipRemoveAdmin")}
                          variant="outlined"
                          style={{ backgroundColor: 'rgba(210,18,25,255)', color: "white" }}
                          onClick={(event) => {
                            AdminUtil.deleteAdmin(user.userId).then((event) => {
                              user.isAdmin = false;
                              setRender(true);
                            });
                          }}
                        />
                      ) : (
                        <Chip
                          label={I18n.t("allUsers.tableChipMakeAdmin")}
                          variant="outlined"
                          style={{ backgroundColor: 'rgba(25, 118, 210, 255)', color: "white" }}
                          onClick={(event) => {
                            AdminUtil.createAdmin(user.userId).then((event) => {
                              user.isAdmin = true;
                              setRender(true);
                            });
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={I18n.t("allUsers.tableChipRemoveUser")}
                        variant="outlined"
                        style={{ backgroundColor: 'rgba(210,18,25,255)', color: "white" }}
                        onClick={(event) => {
                          IOUtil.deleteUser(user.userId).then((event) => {
                            setRender(true);
                            requestAllUsers(new AbortController())
                          })
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <section className="graph" style={{ borderWidth: 0, alignItems: "center", justifyItems: "center", justifyContent: "center", display: "flex" }}><CircularProgress className="circularprogress" /></section>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "100%", marginTop: "1rem", display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ bgColor: "red" }}>
            <Pagination
              count={pages}
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              defaultPage={1}
              boundaryCount={15}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
        <Box className="marginFix" sx={{ minHeight: "2rem" }} />
      </Box>
    </>
  );
};
