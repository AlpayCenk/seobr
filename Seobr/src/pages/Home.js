import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to the SEO Tool</h2>
        <p>This is your go-to tool for all things SEO.</p>
      </main>
      <Footer />
    </div>
  );
};

const Home = ({ data }) => {
  if (!data) return <div>Loading...</div>; // Fallback, falls Daten fehlen
  return (
    <div>
      <Header />
      <h1>{data.title}</h1>
    </div>
  );
};

export default Home;
