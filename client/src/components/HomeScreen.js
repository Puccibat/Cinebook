import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';
import Navbar from './Navbar';

const HomeScreen = () => {
  const imageSrc = '../../../uploads/image-1612431353094.jpg';

  return (
    <>
      <Header />
      <main>
        <div
          className='relative pt-16 pb-32 flex content-center items-center justify-center'
          style={{ minHeight: '55vh' }}
        >
          <div
            className='bg-fixed absolute top-0 w-full h-full bg-center bg-cover'
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
          >
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-50 bg-black'
            ></span>
          </div>
          <div className='container relative mx-auto'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4 ml-auto mr-auto text-center'>
                <div className='pr-12'>
                  <h1 className='text-white font-semibold text-5xl'>
                    Votre cinéma ici
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar />
        <div className=''>
          {/* <h1 className='text-white px-5 md:px-12 mt-6'>Drive</h1>
          <MovieList /> */}
          <MovieDetail />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeScreen;
