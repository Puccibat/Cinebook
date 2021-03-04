import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTheaters } from '../apiFetching';
import TheaterCard from './TheaterCard';

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);

  const loadTheaters = () => {
    getTheaters().then((data) => {
      setTheaters(data);
    });
  };

  const deleteTheater = (theaterDeleted) => {
    setTheaters(theaters.filter((theater) => theater._id !== theaterDeleted));
    toast('Salle supprimée', {
      draggable: true,
      style: { backgroundColor: 'rgba(239, 68, 68)', color: '#fff' },
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    loadTheaters();
  }, []);

  return (
    <div className='text-center'>
      <ToastContainer />
      <h1 className='text-2xl text-white py-4'>Vos salles</h1>
      <button className='bg-green-600 hover:bg-green-400 text-white px-4 py-2  mt-4 rounded'>
        <Link to='/addTheater'>
          Ajouter une salle <i className='fas fa-plus-circle'></i>
        </Link>
      </button>
      <div className='container my-5 mx-auto px-4 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
          {theaters.map((theater) => (
            <TheaterCard
              theater={theater}
              key={theater._id}
              deleteTheater={deleteTheater}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheaterList;
