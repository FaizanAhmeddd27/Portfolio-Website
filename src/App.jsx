import React from 'react';
import Hero from './components/Hero';
import Banner from './components/Banner';
import GetInTouch from './components/GetInTouch';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div
      id="top"
      className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] min-h-screen text-white"
    >
      <Hero />

      <section id="banner" className="relative z-10">
        <Banner />
      </section>

      <section id="contact-section" className="relative z-10">
        <GetInTouch />
      </section>

      <section id="about" className="relative z-10">
        <AboutMe />
      </section>

      <section id="skills" className="relative z-10">
        <Skills />
      </section>

      <section id="projects" className="relative z-10">
        <Projects />
      </section>

      <section id="resume" className="relative z-10">
        <Resume />
      </section>

      <section id="contact" className="relative z-10">
        <Contact />
      </section>

      <Footer />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
