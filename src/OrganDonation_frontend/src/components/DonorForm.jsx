import React, { useEffect, useState } from 'react';
import { Principal } from '@dfinity/principal';
import { OrganDonation_backend } from '../../../declarations/OrganDonation_backend';

const DonorForm = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [organ, setorgan] = useState("");
  const [contact, setcontact] = useState("");
  const [medicalHistory, setmedicalHistory] = useState("");
  var principal =  localStorage.getItem("principal");

  // useEffect(() => {

  //   if(principal){
  //     toast.warning("connect to internet identity");
  //   }
  // },[principal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(principal){
    try {
      var DonorRegistration = {
        name: name,
        age: BigInt(age),
        bloodGroup: bloodGroup,
        organ: organ,
        contact: contact,
        medicalHistory: medicalHistory,
        prin: Principal.fromText(localStorage.getItem("principal")),
      };
      console.log("before register", DonorRegistration);
      var result = await OrganDonation_backend.set_Donor_registration(DonorRegistration);
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  }else{
    alert("connect to Internet Identity");
  }
   window.location.reload();
  };

  return (
    <div className="form-container">
      <h2>Register as Donor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            min="18"
            name="age"
            onChange={(e) => setage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            onChange={(e) => setbloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="A+">A+</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="organ">Organ to Donate</label>
          <select
            id="organ"
            name="organ"
            onChange={(e) => setorgan(e.target.value)}
            required
          >
            <option value="">Select Organ</option>
            <option value="kidney">Kidney</option>
            <option value="liver">Liver</option>
            <option value="heart">Heart</option>
            <option value="lungs">Lungs</option>
            <option value="pancreas">Pancreas</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            pattern="[0-9]{10}"
            onChange={(e) => setcontact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History</label>
          <input
            type="text"
            id="medicalHistory"
            name="medicalHistory"
            onChange={(e) => setmedicalHistory(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register as Donor</button>
      </form>
    </div>
  );
}

export default DonorForm;