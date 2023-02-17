import { Button, Grid, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fi } from "date-fns/locale";
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from "react-router-dom";


interface Props {
    birthdays : Birthday[]
    setBirthdays : React.Dispatch<React.SetStateAction<Birthday[]>>
}

interface Errors {
    name? : string,
    date? : string
}

const Lisaa : React.FC<Props> = ({ birthdays, setBirthdays }) : React.ReactElement => {

    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [errors, setErrors] = useState<Errors>({});


    const handleSubmit = (e : React.FormEvent) : void => {

        e.preventDefault();

        let errors : Errors = {};

        if (!name) {
            errors.name = "Nimi on pakollinen"
        }
        else if (/\d/.test(name)) {
            errors.name = "Nimi ei saa sisältää numeroita"
        }

        if (!date) {
            errors.date = "Päivämäärä on pakollinen"
        }

        const newBirthday : Birthday = {
            name : name,
            date : date,
            id : uuid()
        }

        if (Object.entries(errors).length > 0) {
            setErrors(errors);
        }
        else {
            setBirthdays([...birthdays, newBirthday])
            navigate("/")
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                minHeight="98vh"
            >
                <form onSubmit={handleSubmit} >
                    <Stack
                        spacing={2}
                    >
                        <TextField
                            label="nimi"
                            onChange={(e : any) => setName(e.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        <DatePicker
                            value={date}
                            onChange={(newDate : Date | null) => setDate(newDate!)}
                            renderInput={(params) => <TextField 
                                                        {...params} 
                                                        error={Boolean(errors.date)}
                                                        helperText={errors.date}
                                                    />
                            }
                        />
                        <Button
                            variant="contained"
                            type="submit"
                        >Lisää syntymäpäivä</Button>
                        <Button
                            component={Link}
                            to="/"
                        >Peruuta</Button>
                    </Stack>                   
                </form>
            </Grid>
    </LocalizationProvider>
        
    )
}

export default Lisaa;