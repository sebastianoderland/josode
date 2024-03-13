import { useState } from "react"
import Welcome from "@/Components/Welcome"
import Text from "@/Components/Input/Text"

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    ageGroup: "",
    destination: "",
    recommend: "",
    reasonRec: "",
    purpose: "",
    reasonPur: "",
    weatherConditions: "",
    errors: {},
    isSubmitted: false,
    submittedData: {},
  })

  const [showForm, setShowForm] = useState(false)

  const ageGroups = ["0-8", "19-30", "30+"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }))
  }

  const validateForm = () => {
    let errors = {}
    if (!formState.name || formState.name.trim().length < 2) {
      errors.name = "Name must be at least two characters long."
    }
    if (!formState.ageGroup) {
      errors.ageGroup = "Age Group is required."
    }
    if (!formState.destination || formState.destination.trim().length < 2) {
      errors.destination = "Destination must be at least two characters long."
    }
    if (!formState.purpose) {
      errors.purpose = "Purpose is required."
    } else if (formState.purpose === "Something else") {
      if (!formState.reasonPur || formState.reasonPur.trim().length < 2) {
        errors.reasonPur =
          "Please provide a reason for selecting 'Something else'."
      }
    }
    if (!formState.weatherConditions) {
      errors.weatherConditions = "Weather conditions are required."
    }
    if (!formState.recommend) {
      errors.recommend = "Recommendation is required."
    } else if (formState.recommend === "No!" && !formState.reasonRec) {
      errors.reasonRec = "Please provide a reason for not recommending."
    }
    return errors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      const data = {
        name: formState.name,
        ageGroup: formState.ageGroup,
        destination: formState.destination,
        recommend: formState.recommend,
        reasonRec: formState.reasonRec,
        purpose: formState.purpose,
        reasonPur: formState.reasonPur,
        weatherConditions: formState.weatherConditions,
      }
      setFormState((prevState) => ({
        ...prevState,
        isSubmitted: true,
        submittedData: data,
      }))
    } else {
      setFormState((prevState) => ({
        ...prevState,
        errors,
      }))
    }
  }

  const handleContinue = () => {
    setShowForm(true)
  }

  if (formState.isSubmitted) {
    return (
      <div className="summary-container">
        <h2 className="summary-title">Thank you for your submission!</h2>
        <h3>A summary of your answers:</h3>
        <p>Name: {formState.submittedData.name}</p>
        <p>Age Group: {formState.submittedData.ageGroup}</p>
        <p>Destination: {formState.submittedData.destination}</p>
        <p>Purpose: {formState.submittedData.purpose}</p>
        {formState.submittedData.purpose === "Something else" && (
          <p>Reason: {formState.submittedData.reasonPur}</p>
        )}
        <p>Weather Conditions: {formState.submittedData.weatherConditions}</p>
        <p>Recommendation: {formState.submittedData.recommend}</p>
        {formState.submittedData.recommend === "No!" && (
          <p>Reason: {formState.submittedData.reasonRec}</p>
        )}
      </div>
    )
  }

  return (
    <div className="form-container">
      {!showForm ? (
        <Welcome onClick={handleContinue} />
      ) : (
        <form onSubmit={handleSubmit}>
          <Text
            name="name"
            label="Your name:"
            placeholder="Name:"
            autoComplete="name"
            onChange={handleChange}
            value={formState.name}
            error={formState.errors.name}
          />
          <div className="form-group">
            <p>Age Group:</p>
            {ageGroups.map((group) => (
              <label key={group}>
                <input
                  type="radio"
                  name="ageGroup"
                  value={group}
                  onChange={handleChange}
                  checked={formState.ageGroup === group}
                />
                {group}
              </label>
            ))}
            {formState.errors.ageGroup && (
              <div className="error-message" role="alert" aria-live="polite">
                {formState.errors.ageGroup}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="destination">Where did you travel:</label>
            <input
              id="destination"
              type="text"
              placeholder="Destination:"
              name="destination"
              onChange={handleChange}
              value={formState.destination}
            />
            {formState.errors.destination && (
              <div className="error-message" role="alert" aria-live="polite">
                {formState.errors.destination}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="purpose">What was the purpose of the trip:</label>
            <select
              id="purpose"
              name="purpose"
              value={formState.purpose}
              onChange={handleChange}
            >
              <option value="">Select purpose</option>
              <option value="Business">Business</option>
              <option value="Vacation">Vacation</option>
              <option value="Something else">Something else</option>
            </select>
            {formState.errors.purpose && (
              <div className="error-message" role="alert" aria-live="polite">
                {formState.errors.purpose}
              </div>
            )}
          </div>
          {formState.purpose === "Something else" && (
            <div className="form-group">
              <label htmlFor="reasonPur">You selected something else:</label>
              <input
                id="reasonPur"
                type="text"
                placeholder="What purpose:"
                name="reasonPur"
                onChange={handleChange}
                value={formState.reasonPur}
              />
              {formState.errors.reasonPur && (
                <div
                  className="error-message"
                  role="alert"
                  aria-live="polite"
                >
                  {formState.errors.reasonPur}
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <p>What type of weather conditions were the most common:</p>
            <select
              name="weatherConditions"
              value={formState.weatherConditions}
              onChange={handleChange}
            >
              <option value="">Select weather conditions</option>
              <option value="Sun">Sun</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Rain">Rain</option>
              <option value="Snow">Snow</option>
            </select>
            {formState.errors.weatherConditions && (
              <div className="error-message" role="alert" aria-live="polite">
                {formState.errors.weatherConditions}
              </div>
            )}
          </div>
          <div className="form-group">
            <p>Would you recommend this place?</p>
            <label>
              <input
                type="radio"
                name="recommend"
                value="Yes!"
                onChange={handleChange}
                checked={formState.recommend === "Yes!"}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                value="No!"
                onChange={handleChange}
                checked={formState.recommend === "No!"}
              />
              No
            </label>
            {formState.recommend === "No!" && (
              <div>
                <label htmlFor="reasonRec">You selected No:</label>
                <input
                  id="reasonRec"
                  type="text"
                  placeholder="Why?"
                  name="reasonRec"
                  onChange={handleChange}
                  value={formState.reasonRec}
                />
                {formState.errors.reasonRec && (
                  <div
                    className="error-message"
                    role="alert"
                    aria-live="polite"
                  >
                    {formState.errors.reasonRec}
                  </div>
                )}
              </div>
            )}
            {formState.errors.recommend && (
              <div className="error-message" role="alert" aria-live="polite">
                {formState.errors.recommend}
              </div>
            )}
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
