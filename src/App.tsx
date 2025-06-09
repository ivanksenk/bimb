import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './Components/MainPage/MainPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './API/queryClient';
import { Meetings } from './Components/Meetings/Meetings';
import { NewMeeting } from './Components/NewMeeting/NewMeeting';
import { Login } from './Components/Auth/Login';
import { FetchPeoplesList } from './Components/Peoples/FetchPeoplesList';
import { Menu } from './Components/Menu/Menu';
import { ContactsList } from './Components/Contacts/ContactsList';
import { NewContact } from './Components/Contacts/NewContact/NewContact';
import { PersonPage } from './Components/Peoples/PersonPage/PersonPage';

function App() {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand();
        setId(Number(tg.initDataUnsafe.user?.id))
      }
    } catch (error) {
      console.log('Произошла ошибка, попробуйте позднее')
    }
  })
  if (!id) {
    return (
      <>
        <h3>Приложение только для телеграма</h3>
      </>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path='/me' element={<MainPage />} />
          <Route path='/meetings' element={<Meetings />} />
          <Route path='/meetings/new' element={<NewMeeting />} />
          <Route path='/peoples' element={<FetchPeoplesList/>} />
          <Route path='/people/:id' element={<PersonPage/>} />
          <Route path='/menu' element={<Menu/>} />
          <Route path='/contacts' element={<ContactsList/>} />
          <Route path='/contacts/new' element={<NewContact/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
