import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Input.css";

const Input = ({ setUserData }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goalType: "",
    dietType: "",
    workoutFrequency: "",
    targetWeight: "",
    activityLevel: "",
    allergies: "",
    waterIntake: "",
    sleepPattern: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Send data to AI API & Redirect
  const handleSubmit = async () => {
    try {
      console.log("Submitting Form Data:", formData);
      setUserData(formData); // Store data in state

      // Navigate to Dashboard page
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="input-container">
      <div className="title">
        <span>
          <span className="highlight">Personalize</span> Your Fitness Journey
        </span>
      </div>

      <div className="forms">
        <div className="form-section">
          <h3>Basic Information</h3>
          <input type="number" placeholder="Age" name="age" value={formData.age} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="" disabled hidden>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" placeholder="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
          <input type="number" placeholder="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
        </div>

        <div className="form-section">
          <h3>Fitness Goals</h3>
          <select name="goalType" value={formData.goalType} onChange={handleChange}>
            <option value="" disabled hidden>Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <select name="dietType" value={formData.dietType} onChange={handleChange}>
            <option value="" disabled hidden>Select Diet Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>
          <input type="number" placeholder="Workout Days/Week" name="workoutFrequency" value={formData.workoutFrequency} onChange={handleChange} />
          <input type="number" placeholder="Target Weight (kg)" name="targetWeight" value={formData.targetWeight} onChange={handleChange} />
        </div>

        <div className="form-section">
          <h3>Lifestyle & Preferences</h3>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="" disabled hidden>Select Activity Level</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly Active">Lightly Active</option>
            <option value="Moderately Active">Moderately Active</option>
            <option value="Very Active">Very Active</option>
          </select>
          <select name="allergies" value={formData.allergies} onChange={handleChange}>
            <option value="" disabled hidden>Any Allergies?</option>
            <option value="None">None</option>
            <option value="Dairy">Dairy</option>
            <option value="Gluten">Gluten</option>
            <option value="Nuts">Nuts</option>
          </select>
          <input type="number" placeholder="Daily Water Intake (Liters)" name="waterIntake" value={formData.waterIntake} onChange={handleChange} />
          <select name="sleepPattern" value={formData.sleepPattern} onChange={handleChange}>
            <option value="" disabled hidden>Select Sleep Pattern</option>
            <option value="Less than 5 hours">Less than 5 hours</option>
            <option value="5-6 hours">5-6 hours</option>
            <option value="7-8 hours">7-8 hours</option>
            <option value="More than 8 hours">More than 8 hours</option>
          </select>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Generate My Plan
      </button>
    </div>
  );
};

export default Input;
