import { DialogTitle, ListItem } from "@mui/material"
import { useState } from "react"
import { I18n } from "../../util/language/I18n";
import { userData } from "../../util/AdminUtil";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {AdminUtil,deviceData} from "../../util/AdminUtil";
import {dialogstate} from "./AllDevices"



interface dialogProps{
    open:boolean
    device:deviceData,
    owner?:userData,
    onClose:(device:string)=>void,
    users:userData[]
}
const AssignUserDialog =({open,device,owner,onClose,users}:dialogProps)=>{
    const [user,setOwner]=useState<userData|undefined>(owner? owner:undefined)

    const handleItemListClick=(u:userData,device:deviceData)=>{
        setOwner(u)
        onClose(device.id)
    }
    return (
    <>
    <Dialog onClose={onClose}open={open}>
        <DialogTitle>Assign user account</DialogTitle>
        <List sx={{pt:0}}>
        {users.map((u)=>(
            <ListItem button onClick={()=>handleItemListClick(u,device)} key={u.userId}>
                <ListItemText primary={u.email}/>
            </ListItem>
        ))}
        </List>
    </Dialog>
    </>
)
}
export default AssignUserDialog;