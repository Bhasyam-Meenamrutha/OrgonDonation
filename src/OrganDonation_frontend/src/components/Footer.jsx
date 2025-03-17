import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <Heart size={24} />
            <h3>LifeLink</h3>
          </div>
          <p>Connecting donors with recipients, saving lives one match at a time.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p><Phone size={16} /> Emergency: +1 (800) 555-0123</p>
            <p><Mail size={16} /> info@lifelink.org</p>
            <p><MapPin size={16} /> 123 Medical Center Dr, Healthcare City</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 LifeLink. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;