import { useState, useEffect } from "react";

export const usePatientInfo = () => {
  const [radiologistName, setRadiologistName] = useState("Dr. Jane Smith");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [clinicalHistory, setClinicalHistory] = useState("");
  const [suspectedDisease, setSuspectedDisease] = useState("pneumonia");
  const [examDate, setExamDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [view, setView] = useState("PA");

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    }
  }, [dob]);

  return {
    radiologistName,
    setRadiologistName,
    patientName,
    setPatientName,
    patientId,
    setPatientId,
    dob,
    setDob,
    age,
    sex,
    setSex,
    clinicalHistory,
    setClinicalHistory,
    suspectedDisease,
    setSuspectedDisease,
    examDate,
    setExamDate,
    view,
    setView,
  };
};