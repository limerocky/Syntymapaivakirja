import { Button, Grid, List, ListItem, ListItemText, Stack } from "@mui/material"
import { format } from "date-fns";

interface Props {
    birthdays : Birthday[]
}

const Aloitus : React.FC<Props> = ({ birthdays }) : React.ReactElement => {

    return (
        <Grid
            container
            justifyContent="center"
        >
            <Stack>
                <List>

                    {birthdays.map((birthday : Birthday) => {

                        return (
                            <ListItem
                                key={birthday.id}
                            >
                                <ListItemText primary={birthday.name} secondary={format(birthday.date, "d.M.Y HH:mm")} />
                            </ListItem>
                        );
                    })}
                </List>
                <Button
                    variant="contained"
                >Lisää syntymäpäivä</Button>
            </Stack>
        </Grid>
    )
}

export default Aloitus;