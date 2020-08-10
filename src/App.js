import React from 'react';
import './App.css';
import CSVDownloadButton from './components/CSVDownloadButton.js';
import CuoponList from './components/CuoponList.js';


const App = () => (

  <div className="app__container">

    <header className="header__container">

      <h1 className="header__title color-dark">
        Cuopon Calculator
      </h1>

      <h2 className="header__subtitle color-dark">
        Create cuopons and export them in csv format
      </h2>

      <CSVDownloadButton />

    </header>

    <CuoponList />

    <section className="csv-about__container">

      <h3 className="csv-about__header color-dark">

        How to use

      </h3>

      <ol className="csv-about__list">

        <li className="color-dark csv-about__list-item">
          Enter in a product as well as a discount and an 
          expiration date.
        </li>
        
        <li className="color-dark csv-about__list-item">
          Once you've added a cuopon, you can edit it 
          directly if you need to make changes.
          Or you can remove the cuopon.
        </li>

        <li className="color-dark csv-about__list-item">
          When you're ready, click on the Download CSV button 
          to download the csv file with you cuopon data.
        </li>
        
        <li className="color-dark csv-about__list-item">
          Open it using Google sheets, Excel, 
          or any other table editing software!
        </li>

      </ol>

    </section>

    <footer className="footer__container">

      <p className="color-dark">
        Copyright Hacker Supreme 2020
      </p>

      <a className="color-dark" href="http://hackersupreme.com" target="_blank">
        hackersupreme.com
      </a>

    </footer>

  </div>

);


export default App;
