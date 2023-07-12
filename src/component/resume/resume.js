import React, { useState, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import './resume.css';
import Navbar from '../navbar/navbar';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    minHeight: 600,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
});

function ResumeCreator() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const resumeRef = useRef();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  };

  function ResumeDocument({ name, email, phone, skills, experience, education }) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Resume</Text>

          <View>
            <Text style={styles.content}>Name: {name}</Text>
            <Text style={styles.content}>Email: {email}</Text>
            <Text style={styles.content}>Phone: {phone}</Text>
          </View>

          <View>
            <Text style={styles.content}>Skills:</Text>
            <Text style={styles.content}>{skills}</Text>
          </View>

          <View>
            <Text style={styles.content}>Experience:</Text>
            <Text style={styles.content}>{experience}</Text>
          </View>

          <View>
            <Text style={styles.content}>Education:</Text>
            <Text style={styles.content}>{education}</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <div className="res">
      <Navbar />
      <div className="cardx">
        <h1>CREATE YOUR RESUME AND DOWNLOAD</h1>

        <form>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>

          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>

          <label>
            Phone:
            <input type="tel" value={phone} onChange={handlePhoneChange} /><br/><br/>
          </label>

          <label>
            Skills:
            <textarea value={skills} onChange={handleSkillsChange} />
          </label>

          <label>
            Experience:
            <textarea value={experience} onChange={handleExperienceChange} />
          </label>

          <label>
            Education:
            <textarea value={education} onChange={handleEducationChange} />
          </label>
        </form>

        <div ref={resumeRef}>
          <h2>Resume</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <h3>Skills</h3>
          <p>{skills}</p>
          <h3>Experience</h3>
          <p>{experience}</p>
          <h3>Education</h3>
          <p>{education}</p>
        </div>

        <PDFDownloadLink document={<ResumeDocument name={name} email={email} phone={phone} skills={skills} experience={experience} education={education} />} fileName="resume.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default ResumeCreator;
