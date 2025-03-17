import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import DonorForm from './components/DonorForm';
import RecipientForm from './components/RecipientForm';
import MatchResults from './components/MatchResults';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { OrganDonation_backend } from '../../declarations/OrganDonation_backend';

function App() {
  const [view, setView] = useState('dashboard');
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const donorData = await handleAddDonor();
      const recipientData = await handleAddRecipient();
      findMatches(donorData, recipientData);
      
    };

    fetchData();
  }, []);

  async function handleAddDonor() {
    const donorData = await OrganDonation_backend.get_all_Donors();
    setDonors(donorData);
    console.log("alldonors", donorData);
    return donorData;  // Return data for matching logic
  }

  async function handleAddRecipient() {
    const recipientData = await OrganDonation_backend.get_all_Recipient();
    setRecipients(recipientData);
    console.log("allrecept", recipientData);
    return recipientData;  // Return data for matching logic
  }

  const findMatches = (donorsList, recipientsList) => {
    const newMatches = [];

    recipientsList.forEach((recipient) => {
      const compatibleDonors = donorsList.filter((donor) =>
        donor.bloodGroup.trim() === recipient.bloodGroup.trim() &&
        donor.organ.trim().toLowerCase() === recipient.reqorgan.trim().toLowerCase()
      );

      if (compatibleDonors.length > 0) {
        newMatches.push({ recipient, compatibleDonors });
      }
    });

    if (newMatches.length > 0) {
      console.log("✅ Match found!");
    } else {
      console.log("❌ No match found.");
    }

    setMatches(newMatches); 
  };

  return (
    <div className="app-container">
      <Navbar view={view} setView={setView} />

      <main className="main-content">
        <div className="hero-section">
          <img
            src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=2000"
            alt="Medical professionals"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1>Save Lives Through Organ Donation</h1>
            <p>Join our mission to help those in need</p>
          </div>
        </div>

        <div className="container">
          {view === 'dashboard' && (
            <>
              <Dashboard donors={donors} recipients={recipients} matches={matches} />
              <div className="info-section">
                <div className="info-card">
                  <img
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800"
                    alt="Medical care"
                    className="info-image"
                  />
                  <h3>Why Donate?</h3>
                  <p>Your donation can save up to 8 lives and enhance the lives of up to 75 people.</p>
                </div>
                <div className="info-card">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                    alt="Medical research"
                    className="info-image"
                  />
                  <h3>How It Works</h3>
                  <p>Register as a donor or recipient, and our system will find potential matches.</p>
                </div>
              </div>
            </>
          )}
          {view === 'donor' && <DonorForm onSubmit={handleAddDonor} />}
          {view === 'recipient' && <RecipientForm onSubmit={handleAddRecipient} />}
          {view === 'matches' && <MatchResults matches={matches} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
