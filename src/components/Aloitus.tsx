import { Button, Grid, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material"
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface Props {
    birthdays : Birthday[];
}

const Aloitus : React.FC<Props> = ({ birthdays }) : React.ReactElement => {


    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="98vh"
        >
            <Stack
                sx={{
                    borderColor:"blue",
                    border:"solid thin",
                    padding:"3vh"
                }}
            >
                <List>

                    {birthdays.map((birthday : Birthday) => {

                        return (
                            <ListItem
                                key={birthday.id}
                            >
                                <ListItemText primary={birthday.name} secondary={format(birthday.date, "d.M.Y")} />
                                <IconButton
                                    component={Link}
                                    to={`/delete/${birthday.id}`}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    to={`/tidbit/${birthday.id}`}
                                >
                                    <PriorityHighIcon />
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
                <Button
                    variant="contained"
                    component={Link}
                    to="/add"
                >Lisää syntymäpäivä</Button>
            </Stack>
        </Grid>
    )
}

export default Aloitus;