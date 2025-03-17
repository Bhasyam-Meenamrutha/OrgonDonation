import React from 'react';

function MatchResults({ matches }) {
  if (matches.length === 0) {
    return (
      <div className="form-container">
        <h2>Organ Matches</h2>
        <p>No matches found yet.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Organ Matches</h2>
      <div className="results">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <h3>Match Found!</h3>
            <div>
              <h4>Recipient Details:</h4>
              <p>Name: {match.recipient.name}</p>
              <p>Blood Group: {match.recipient.bloodGroup}</p>
              <p>Required Organ: {match.recipient.reqorgan}</p>
              <p>Urgency: {match.recipient.urgencyLevel}</p>
            </div>
            <div>
              <h4>Compatible Donors:</h4>
              {match.compatibleDonors.map((donor, idx) => (
                <div key={idx} className="donor-details">
                  <p>Name: {donor.name}</p>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>Contact: {donor.contact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchResults;