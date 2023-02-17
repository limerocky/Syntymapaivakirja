import { Button, Grid, Typography } from "@mui/material"
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";


interface Props {
    birthdays : Birthday[]
}

const Tanaan : React.FC<Props> = ({ birthdays }) : React.ReactElement => {

    const [text, setText] = useState<string>("");
    const haettu = useRef<boolean>(false);
    const { id } = useParams();

    const date = birthdays.find((birthday : Birthday) => birthday.id === id)!.date

    const getData = async () : Promise<void> => {

        try {
            const connection = await fetch(`http://numbersapi.com/${format(date, "M/d")}/date?json`);
            const data = await connection.json();

            setText(data.text);
        }
        catch (e : any) {
            setText("Virhe tidbittiä ladattaessa");
        }
    }

    useEffect(() => {
        
        if (!haettu.current) {
            getData();
        }

        return () => {
            haettu.current = true;
        }

    },)

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="98vh"
        >
            <Typography>{text}</Typography>
            <Button
                component={Link}
                to="/"
            >Takaisin</Button>
        </Grid>
    )
}

export default Tanaan;