import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us - SEO Tool Starter</title>
        <meta name="description" content="Learn more about the SEO Tool Starter and the team behind it." />
      </Head>
      <Header />
      <main>
        <h2>About Us</h2>
        <p>We provide the best SEO tools for your needs.</p>
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

export default About;
