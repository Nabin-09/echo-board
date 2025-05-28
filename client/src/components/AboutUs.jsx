import React from 'react';
const API = import.meta.env.VITE_API_URL;


const AboutUs = () => {
  return (
    <>
     

      <div className="about-container">
        <div className="about-content">
          <header className="page-header">
            <h1 className="page-title">About EchoBoard</h1>
            <p className="page-subtitle">Transforming feedback into meaningful insights</p>
          </header>

          <section className="content-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              At EchoBoard, we believe that every voice matters. Feedback is the cornerstone of growth, 
              innovation, and meaningful relationships between businesses and their customers. Our platform 
              empowers organizations to collect, manage, and act upon feedback in ways that drive real change 
              and continuous improvement.
            </p>
            <p className="section-text">
              We understand that feedback isn't just data—it's the voice of your community, the pulse of 
              your customer satisfaction, and the roadmap to your future success. That's why we've built 
              EchoBoard to make feedback management simple, insightful, and actionable.
            </p>
          </section>

          <div className="highlight-box">
            <div className="highlight-text">Every Feedback Tells a Story</div>
            <div className="highlight-subtext">
              We help you listen, understand, and respond to what matters most
            </div>
          </div>

          <section className="content-section">
            <h2 className="section-title">Why Feedback Matters</h2>
            <p className="section-text">
              In today's fast-paced world, the gap between businesses and their customers continues to grow. 
              Feedback bridges this gap by creating meaningful dialogue, fostering trust, and enabling 
              organizations to evolve based on real user needs rather than assumptions.
            </p>
            <p className="section-text">
              Whether you're a startup looking to refine your product-market fit, an established company 
              seeking to maintain customer loyalty, or a service provider aiming to exceed expectations, 
              feedback is your most valuable asset for making informed decisions.
            </p>
          </section>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Collect</h3>
              <p className="feature-text">
                Gather feedback seamlessly across multiple channels and touchpoints, 
                making it easy for your audience to share their thoughts.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Analyze</h3>
              <p className="feature-text">
                Transform raw feedback into actionable insights with powerful analytics 
                and visualization tools that reveal patterns and trends.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Improve</h3>
              <p className="feature-text">
                Take decisive action based on feedback insights, track your progress, 
                and create a continuous cycle of improvement.
              </p>
            </div>
          </div>

          <section className="content-section">
            <h2 className="section-title">Our Commitment</h2>
            <p className="section-text">
              We're committed to making feedback management accessible, efficient, and impactful for 
              organizations of all sizes. Our team continuously innovates to ensure that EchoBoard 
              remains at the forefront of feedback technology, helping you build stronger relationships 
              with your customers and stakeholders.
            </p>
          </section>

          <div className="cta-section">
            <h2 className="cta-title">Ready to Transform Your Feedback?</h2>
            <p className="cta-text">
              Join thousands of organizations already using EchoBoard to turn feedback into their competitive advantage.
            </p>
            <button className="cta-button">Get Started Today</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;