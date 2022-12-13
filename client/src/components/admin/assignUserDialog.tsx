import { DialogTitle, ListItem } from "@mui/material"
import { useState } from "react"
import { I18n } from "../../util/language/I18n";
import { userData } from "../../util/AdminUtil";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { color } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";

export interface assignUserDialogProps {
    open:boolean
    selectedValue:number
    onClose:(value: number)=>void
    users:userData[]
}

const assignUserDialog = ({open,selectedValue, onClose,users}:assignUserDialogProps)=>{
    const [Value, setValue] = useState(selectedValue)
    const handleClose = ()=>{
        onClose(Value)
    };
    const handleListItemClick = (value:number)=>{
        onClose(Value)
    };

return (
    <>
   <Dialog onClose={handleClose} open={open}>
    <DialogTitle>{I18n.t("assignUserDivices.assign")}</DialogTitle>
    <List sx={{pt:0}}>
        {users.map((u)=>(
            <ListItem button onClick={()=>handleListItemClick(u.userId)} key={u.userId}>
             <ListItemText primary={`${u.firstname} ${u.lastname}`} secondary={u.email}/>
            </ListItem>
        ))}
    </List>
   </Dialog>
    </>
)
}
export default assignUserDialog;