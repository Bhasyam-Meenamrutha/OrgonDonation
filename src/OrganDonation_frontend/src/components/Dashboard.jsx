import React, { useState } from 'react';
import { OrganDonation_backend } from '../../../declarations/OrganDonation_backend';
import { Activity, Users, Heart, UserCheck } from 'lucide-react';
import { useEffect } from 'react';



function Dashboard({ donors, recipients, matches }) {

  const [donorsize, setdonorsize]= useState("");
  const [receptsize, setreceptsize]= useState("");
 

  useEffect(() => {

    
       get_Donors_size();
       get_Recipient_size();
      
    
  }, []);

  async function get_Donors_size() {
      var donor_size=await OrganDonation_backend.get_Donors_size();
      setdonorsize(donor_size);
      console.log("donor_size",donor_size);
  }

  async function get_Recipient_size(){
    var recept_size = await OrganDonation_backend.get_Recipient_size();
    setreceptsize(recept_size);
    console.log("recept_size",recept_size);
  };

  return (
    <div className="dashboard">
      <div className="stat-card">
        <Activity size={24} />
        <h3>Total Donors</h3>
        <p className="stat-number">{Number(donorsize)}</p>
      </div>

      <div className="stat-card">
        <Users size={24} />
        <h3>Total Recipients</h3>
        <p className="stat-number">{Number(receptsize)}</p>
      </div>

      <div className="stat-card">
        <Heart size={24} />
        <h3>Successful Matches</h3>
        <p className="stat-number">{matches.length}</p>
      </div>

      <div className="stat-card">
        <UserCheck size={24} />
        <h3>Available Organs</h3>

        <div>
          {Object.entries(
            donors.reduce((acc, donor) => {
              acc[donor.organ] = (acc[donor.organ] || 0) + 1;
              return acc;
            }, {})
          ).map(([organ, count]) => (
            <p key={organ}>
              {organ.charAt(0).toUpperCase() + organ.slice(1)}: {count}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;