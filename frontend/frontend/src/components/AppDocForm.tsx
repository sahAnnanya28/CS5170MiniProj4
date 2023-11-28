import React, { useState } from 'react';
import './AppDocForm.css'; // Make sure to create this CSS file
import {
    createResponseService,
  } from "../services/backend-service";
type FormData = {
  functions: string;
  authHeaders: string;
  basicDetails: string;
  generateErrorCodes: boolean;
  generateSampleUsage: boolean;
  generateRateLimitSection: boolean;
  rateLimitData: string;
  generateAuthDetails: boolean;
  domainKnowledge: number;
};

function AppDocForm() {
  const [formData, setFormData] = useState<FormData>({
    functions: '',
    authHeaders: '',
    basicDetails: '',
    generateErrorCodes: false,
    generateSampleUsage: false,
    generateRateLimitSection: false,
    rateLimitData: '',
    generateAuthDetails: false,
    domainKnowledge: 1,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your logic to send formData to your backend
    console.log("PAYLOAD", formData);
    const contentString = JSON.stringify(formData);

    const newRequest = {
        role: "user",
        content: contentString,
      };
    let payload = [];
    payload.push(newRequest);

    console.log("PAYLOAD", payload);
    const { request, cancel } = createResponseService().post(payload);
    request
      .then((res) => {
        // setMessageHistory([...messageHistory, data.message, res.data]);
        // // console.log(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setError(err.message);
        // setMessageHistory([...originalHistory]);
        // setIsLoading(false);
      });
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement; // Type assertion here
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  return (
    <div className="api-doc-form">
      <h1>API Documentation Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="functions" className="form-label">Function Declarations</label>
          <textarea 
            name="functions"
            value={formData.functions}
            onChange={handleInputChange}
            id="functions" 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="auth" className="form-label">Authentication Headers</label>
          <input 
            name="authHeaders"
            value={formData.authHeaders}
            onChange={handleInputChange}
            id="auth" 
            type="text" 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">Basic Details</label>
          <input 
            name="basicDetails"
            value={formData.basicDetails}
            onChange={handleInputChange}
            id="details" 
            type="text" 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input 
              name="generateErrorCodes"
              checked={formData.generateErrorCodes}
              onChange={handleInputChange}
              className="form-check-input" 
              type="checkbox" 
              id="errorCodes"
            />
            <label className="form-check-label" htmlFor="errorCodes">Generate Error Codes Section</label>
          </div>
          <div className="form-check">
            <input 
              name="generateSampleUsage"
              checked={formData.generateSampleUsage}
              onChange={handleInputChange}
              className="form-check-input" 
              type="checkbox" 
              id="sampleUsage"
            />
            <label className="form-check-label" htmlFor="sampleUsage">Generate Sample Usage Section</label>
          </div>
          <div className="form-check">
            <input 
              name="generateRateLimitSection"
              checked={formData.generateRateLimitSection}
              onChange={handleInputChange}
              className="form-check-input" 
              type="checkbox" 
              id="rateLimit"
            />
            <label className="form-check-label" htmlFor="rateLimit">Generate Rate Limit Section</label>
          </div>
          {formData.generateRateLimitSection && (
            <div className="mb-3">
              <label htmlFor="rateLimitData" className="form-label">Rate Limit Data (CSV format)</label>
              <textarea 
                name="rateLimitData"
                value={formData.rateLimitData}
                onChange={handleInputChange}
                id="rateLimitData" 
                className="form-control"
              />
            </div>
          )}
          <div className="form-check">
            <input 
              name="generateAuthDetails"
              checked={formData.generateAuthDetails}
              onChange={handleInputChange}
              className="form-check-input" 
              type="checkbox" 
              id="authDetails"
            />
            <label className="form-check-label" htmlFor="authDetails">Generate Detailed User Authentication Process</label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="domainKnowledge" className="form-label">Domain Knowledge Level</label>
          <input 
            name="domainKnowledge"
            value={formData.domainKnowledge}
            onChange={handleInputChange}
            type="range" 
            className="form-range" 
            min="1" 
            max="5" 
            id="domainKnowledge"
          />
        </div>
        <button type="submit" className="btn btn-primary">Generate Documentation</button>
      </form>
    </div>
  );
}

export default AppDocForm;
