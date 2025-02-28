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

export default Home;