import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Progress.css";
import Sleep from "../../assets/sleep.png";
import Steps from "../../assets/footprint.png";
import Calories from "../../assets/calories.png";
import Distance from "../../assets/placeholder.png";
import Graph from "../../assets/graph.png";
import Diet from "../../assets/diet.png";
import Workout from "../../assets/workout.png";
import Roadmap from "../../assets/roadmap.png";

const API_KEY = "AIzaSyAN40P9Ad_3COVtCUTzxKzAmmw9D1vUrZM"; // 🔹 Replace with your actual API key
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const Progress = ({ userData }) => {
  const [generatedPlan, setGeneratedPlan] = useState({
    diet: "Loading...",
    workout: "Loading...",
    roadmap: "Loading...",
  });

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;

    const {
      age,
      gender,
      height,
      weight,
      goalType,
      dietType,
      workoutFrequency,
      targetWeight,
      activityLevel,
      allergies,
      waterIntake,
      sleepPattern,
    } = userData;

    const prompts = {
      diet: `Create a detailed diet plan for a ${age}-year-old ${gender}, height ${height} cm, weight ${weight} kg, following a ${dietType} diet. They have allergies: ${allergies}, aim for ${goalType} with target weight ${targetWeight} kg. Include meal timing, macros, and hydration (${waterIntake} L/day).`,
      workout: `Design a workout plan for a ${age}-year-old ${gender} with a ${activityLevel} lifestyle. They exercise ${workoutFrequency} days per week to achieve ${goalType}. Include cardio, strength training, and recovery based on their fitness level. Consider sleep quality (${sleepPattern}).`,
      roadmap: `Develop a structured roadmap to help a ${age}-year-old ${gender} reach ${targetWeight} kg. Their current weight is ${weight} kg, with ${workoutFrequency} workouts per week and ${activityLevel} activity level. Outline key milestones, weekly adjustments, and motivation strategies.`,
    };

    const fetchAIResponse = async (promptType, promptText) => {
      try {
        const response = await axios.post(GEMINI_URL, {
          contents: [{ parts: [{ text: promptText }] }],
        });
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      } catch (error) {
        console.error(`Error fetching ${promptType}:`, error.response?.data || error.message);
        return `Error fetching ${promptType} AI response.`;
      }
    };

    const fetchAllResponses = async () => {
        setLoading(true);
      try {
        const [dietPlan, workoutPlan, roadmapPlan] = await Promise.all([
          fetchAIResponse("Diet Plan", prompts.diet),
          fetchAIResponse("Workout Plan", prompts.workout),
          fetchAIResponse("Roadmap", prompts.roadmap),
        ]);

        setGeneratedPlan({
          diet: dietPlan,
          workout: workoutPlan,
          roadmap: roadmapPlan,
        });
      } catch (error) {
        console.error("Error fetching all responses:", error);
        setGeneratedPlan({
          diet: "Error fetching diet plan.",
          workout: "Error fetching workout plan.",
          roadmap: "Error fetching roadmap.",
        });
      } finally{
          setLoading(false);
      }
    };

    fetchAllResponses();
  }, [userData]);


  return (
    <div className="Prog-Container">
      <div className="head-text">
        <p className="heading">Progress Overview & Structured Plan</p>
        <p className="user">Welcome <span>{userData?.name || "User"}</span></p>
      </div>

      <div className="graph-chart">
        <img src={Graph} alt="Graph" />
      </div>

      <div className="wearables">
        <div className="card">
          <div className="card-title">
            <img src={Sleep} alt="Sleep" />
            <p>Sleep</p>
          </div>
          <div className="matrix">
            <p><span id="heart">7.8 </span> Hours</p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <img src={Steps} alt="Steps" />
            <p>Steps</p>
          </div>
          <div className="matrix">
            <p><span id="heart">10000</span> STEPS</p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <img src={Calories} alt="Calories" />
            <p>Calories</p>
          </div>
          <div className="matrix">
            <p><span id="heart">81 </span> Kcal</p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <img src={Distance} alt="Distance" />
            <p>Distance</p>
          </div>
          <div className="matrix">
            <p><span id="heart">1.92 </span> KM</p>
          </div>
        </div>
      </div>

      {/* Generate AI Container */}
      <div className="generate">
        <div className="card-pro">
          <div className="pro-title">
            <img src={Diet} alt="Diet" />
            <p>Diet Plan</p>
          </div>
          <div className="gen-ai">
            <textarea rows="4" value={generatedPlan.diet} readOnly></textarea>
          </div>
        </div>

        <div className="card-pro">
          <div className="pro-title">
            <img src={Workout} alt="Workout" />
            <p>Workout Plan</p>
          </div>
          <div className="gen-ai">
            <textarea rows="4" value={generatedPlan.workout} readOnly></textarea>
          </div>
        </div>

        <div className="card-pro">
          <div className="pro-title">
            <img src={Roadmap} alt="Roadmap" />
            <p>RoadMap</p>
          </div>
          <div className="gen-ai">
            <textarea rows="4" value={generatedPlan.roadmap} readOnly></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
