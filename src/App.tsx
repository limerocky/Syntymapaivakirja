import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Aloitus from './components/Aloitus';
import { v4 as uuid } from 'uuid';

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
        }))
      }
    }

    return () => {
      ladattu.current = true;
    }

  }, [])

  useEffect(() => {

    localStorage.setItem("birthdays", JSON.stringify(birthdays))

  }, [birthdays])


  return (
    
    <Routes>

      <Route path="/" element={<Aloitus birthdays={birthdays} />} />

    </Routes>

  );
}

export default App;
