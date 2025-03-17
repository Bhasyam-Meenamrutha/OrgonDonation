import React, { useEffect, useState } from 'react';
import { Principal } from '@dfinity/principal';
import { OrganDonation_backend } from '../../../declarations/OrganDonation_backend';

// function RecipientForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     bloodGroup: '',
//     organ: '',
//     contact: '',
//     urgency: '',
//     medicalHistory: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ ...formData, id: Date.now() });
//     setFormData({
//       name: '',
//       age: '',
//       bloodGroup: '',
//       organ: '',
//       contact: '',
//       urgency: '',
//       medicalHistory: ''
//     });
//     console.log(formData)
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
const RecipientForm = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [reqorgan, setreqorgan] = useState("");
  const [urgencyLevel, seturgencyLevel] = useState("");
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
    try {
      if(principal){
      var RecipientRegistration = {
        name: name,
        age: BigInt(age),
        bloodGroup: bloodGroup,
        reqorgan: reqorgan,
        urgencyLevel : urgencyLevel,
        contact: contact,
        medicalHistory: medicalHistory,
        prin: Principal.fromText(localStorage.getItem("principal")),
      };
      console.log("before register", RecipientRegistration);
      var result = await OrganDonation_backend.set_Recipient_registration(RecipientRegistration);
      console.log("result", result);
    } else{
      alert("connect to Internet Identity");
    };
  }
    catch (error) {
      console.log(error);
  };
   window.location.reload();
}

  return (
    <div className="form-container">
      <h2>Register as Recipient</h2>
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
          <label htmlFor="organ">Required Organ</label>
          <select
            id="organ"
            name="organ"
            onChange={(e) => setreqorgan(e.target.value)}
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
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            name="urgency"
            onChange={(e) => seturgencyLevel(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
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

        <button type="submit">Register as Recipient</button>
      </form>
    </div>
  );
}

export default RecipientForm;