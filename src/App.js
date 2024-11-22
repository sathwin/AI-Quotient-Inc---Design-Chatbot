// App.js

import React from 'react';
import Chatbot from './Chatbot';
import './App.css'; // Import your CSS file for styling

function App() {
  return (
    <div className="app-container">
      {/* Website Interface */}
      <header>
        <img
          src="https://lh6.googleusercontent.com/Z5NzFRngi1oP60jlTnn_9N3HX9uuM1DiahXTFqYsSDtIzpPBCG6cx67VSN2Yc2t1UnMee8bJvCGD7ZQsa5vdPBw=w16383"
          alt="AI Quotient, Inc."
        />
        <h1>AI Quotient, Inc.</h1>
        <p>Empowering organizations through ethical, human-centric AI solutions.</p>
      </header>

      <nav>
        <a href="/home">Home</a>
        <a href="/ai-performance-monitoring">AI Performance Monitoring</a>
        <a href="/ai-implementation">Implementation</a>
        <a href="/ai-ethics">AI Ethics</a>
        <a href="/custom-models">Custom Models</a>
        <a href="/data-strategy">Data Strategy</a>
      </nav>

      <section className="hero">
        <h1>Transforming Businesses Through AI</h1>
        <p>Unleashing the potential of Artificial Intelligence to redefine industries.</p>
        <a href="mailto:info@aiquotient.io" className="cta-button">
          Get Started
        </a>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <img
              src="https://lh6.googleusercontent.com/xLn6kZ6pdXJSu3jDFKaeqzY8MR0oasS-nd2FTH7o4v5_NTz4msmyHCtGIralbRpTntkpPVt7u1sy9x-hS4Il0aMobmSNkW48odgxpCbMMz37F9cqSDY_qTRIXTfq8akG2A=w1280"
              alt="AI Strategy"
            />
            <h3>AI Strategy Consulting</h3>
            <p>
              Developing strategies to align AI initiatives with business goals and create impactful
              solutions.
            </p>
          </div>
          <div className="service-card">
            <img
              src="https://lh3.googleusercontent.com/kSNHW_dt7CRjXEq-a0XEFPSViKVhDNa9iFDACQuVQnQB4MoWtnwVqYwh7XRU5o9vtYguaG25UICR8f_bTbR1CWYBJDAnYxi8F4SbgPejLBbFptL5I1OVw_vBq3BJ1wB_=w1280"
              alt="Data Strategy"
            />
            <h3>Data Strategy</h3>
            <p>
              Ensuring high-quality data collection, management, and preparation for AI training.
            </p>
          </div>
          <div className="service-card">
            <img
              src="https://lh3.googleusercontent.com/XmXfI9MIj6j10dqWPuexH5yZ7HiS73vEenYEQ7__qtg28EfnaNiOJHHwGG7HY2gex5UryvORgOah5ddJtI6Mj0pv7KzHDn_ABRkZ9tM0wIbyP3xvbCpKnByy_YbZA9Jf9g=w1280"
              alt="Custom Models"
            />
            <h3>Custom AI Models</h3>
            <p>Building and deploying AI models tailored to your business needs.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          AI Quotient is a trusted partner for businesses seeking to unlock their potential with
          AI-driven solutions. From strategy consulting to custom model development, we focus on
          ethical and human-centric AI innovations.
        </p>
      </section>

      <footer>
        <p>&copy; 2024 AI Quotient, Inc. All rights reserved.</p>
        <p>
          Visit us at: <a href="https://www.aiquotient.io">www.aiquotient.io</a>
        </p>
      </footer>

      {/* Include the Chatbot component */}
      <Chatbot />
    </div>
  );
}

export default App;
