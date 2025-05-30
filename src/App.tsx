import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from "@mui/material";
import Aloitus from './components/Aloitus';
import Lisaa from './components/Lisaa';
import Poista from './components/Poista';
import Tanaan from './components/Tanaan';

function App() {

  const ladattu : React.MutableRefObject<boolean> = useRef<boolean>(false);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    
    if (!ladattu.current) {
      
      if (localStorage.getItem("birthdays")) {

        setBirthdays(JSON.parse(String(localStorage.getItem("birthdays"))).map((birthday : Birthday) => {
          return {
            ...birthday,
            date : new Date(birthday.date)
          }
        }));
      }
    }

    return () => {
      ladattu.current = true;
    }

  }, []);

  useEffect(() => {

    localStorage.setItem("birthdays", JSON.stringify(birthdays))

  }, [birthdays]);


  return (
    <>
      {/* Apply global styles */}
        <CssBaseline />
        <GlobalStyles
        styles={{
          "html, body, #root": {
            background: "radial-gradient(circle,rgb(38, 123, 219) 0%, white 160%)", // White to blue gradient
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
    />
    
    <Routes>

      <Route path="/" element={<Aloitus birthdays={birthdays} />} />

      <Route path="/add" element={<Lisaa birthdays={birthdays} setBirthdays={setBirthdays} />} />

      <Route path="/delete/:id" element={<Poista birthdays={birthdays} setBirthdays={setBirthdays} />} />

      <Route path="/tidbit/:id" element={<Tanaan birthdays={birthdays} />} />

    </Routes>
    
    </>
  );
}

export default App;
