import { Button, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

interface Props {
    birthdays : Birthday[];
    setBirthdays : React.Dispatch<React.SetStateAction<Birthday[]>>;
}

const Poista : React.FC<Props> = ({ birthdays, setBirthdays }) : React.ReactElement => {

    const { id } = useParams();
    const selected : any = birthdays.find((birthday : Birthday) => birthday.id === id);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="98vh"
        >
            <Stack
                spacing={2}
            >
                <Typography
                    color="rgb(201, 195, 195)"
                >
                    Haluatko varmasti poistaa henkilön "{selected.name}" syntymäpäivän listasta?
                </Typography>
                <Button
                    sx ={{ color: "blue" }}
                    variant="contained"
                    component={Link}
                    to="/"
                    onClick={() => setBirthdays(birthdays.filter((birthday : Birthday) => birthday.id !== id))}
                >Vahvista</Button>
                <Button
                    sx ={{ color: "blue", background: "white"}}
                    variant="outlined"
                    component={Link}
                    to="/"
                >Peruuta</Button>
            </Stack>
        </Grid>
    )
}

export default Poista;