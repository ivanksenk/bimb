import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { BackButton } from "../../UI/BackButton/BackButton";
import '../contacts.css'
import { getContactsCategory } from "../../../API/contacts/contacts.api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../API/queryClient";
import { FormEvent, useState } from "react";
import { Contact } from "../../../Interfaces/Contacts.interface";
import { myAxios } from "../../../API/config";
import { Loader } from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearStore } from "../../../API/storeTokens";
import { checkMe } from "../../../API/auth";



interface NewContactProps {

}

export const NewContact: React.FC<NewContactProps> = () => {

  useEffect(() => {
    checkMe()
    .then(res=>{
        if(res.status === 403){
            clearStore();
            navigate('/');
        }
    })
    .catch(err=>{
        console.log(err);
        clearStore();
        navigate('/');
    })
   
    }, [])

  const [load, setLoad] = useState(false);
  const [message,setMessage] = useState('');
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(1);
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');

  const id = Number(localStorage.getItem('userId'))
  const { isPending, error, data } = useQuery({
    queryFn: () => getContactsCategory(),
    queryKey: ['contacts_category']
  }, queryClient);

  const handleSaveContact = (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const contact: Contact = {
      title: title,
      description: description,
      categoryId: category,
      phone: phone,
      url: url,
      creatorId: id
    }
    const token = localStorage.getItem('token');
    myAxios.post('/contacts', contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res =>{
        if(res.status === 200){
          setMessage('Контакт успешно сохранен');
          queryClient.invalidateQueries({queryKey:['contacts']});
          setTimeout(()=>{
            navigate('/contacts');
          },500)
        }
      })
      .catch(err => console.log(err))

  }

  if (isPending) return <p>Loading..</p>
  if (error) return <p>Err</p>
  if (data && Array.isArray(data)) {
    console.log(data)
    return (
      <>
        <Header title="Новый контакт" />
        <div className="container">
          <BackButton url="/contacts" />
          <form className="new-contact-form flex" onSubmit={handleSaveContact}>
            <label className='input-label flex'>
              <span className='label-text'>Заголовок*</span>
              <input type="text" required className="input" onChange={e => setTitle(e.target.value)} />
            </label>
            <label className='input-label flex'>
              <span className='label-text'>Выберите категорию*</span>
              <select className="input" required onChange={e => setCategory(Number(e.target.value))}>
                {data.map((item) => {
                  return <option key={item.id} value={item.id}>{item.title}</option>
                })}
              </select>
            </label>
            <label className='input-label flex'>
              <span className='label-text'>Описание</span>
              <textarea className="input text-area" onChange={e => setDescription(e.target.value)} />
            </label>
            <label className='input-label flex'>
              <span className='label-text'>Телефон</span>
              <input type="text" className="input" onChange={e => setPhone(e.target.value)} />
            </label>
            <label className='input-label flex'>
              <span className='label-text'>Ссылка на группу или сайт</span>
              <input type="text" className="input" onChange={e => setUrl(e.target.value)} />
            </label>
            {message? <p>{message}</p> : null}
            {load ? <Loader /> : <button className="btn">Сохранить</button>}
          </form>
        </div>
        <Footer />
      </>
    );
  }
};

