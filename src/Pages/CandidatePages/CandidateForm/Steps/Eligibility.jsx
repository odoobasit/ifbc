import React from "react";

const Eligibility = ({
  handleInputChange,
  candDetails,
  candNames,
  selectedDetails,
  setStep,
}) => {
  const militaryOptions = [
    { value: "", label: "Select one" },
    { value: "Veteran", label: "Veteran" },
    { value: "First Responder", label: "First Responder" },
    { value: "Minority", label: "Minority" },
    { value: "Woman", label: "Woman" },
    { value: "Conversion", label: "Conversion" },
    { value: "Existing Franchisee", label: "Existing Franchisee" },
  ];
  return (
    <div id="eligibility" className="candidate-tabs-content">
      <h1 className="candidate-sub-heading ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        Eligibility
      </h1>
      <div className="candidate-input-container">
        <p className="candidate-questions">
          How do you plan on funding the business?
        </p>
        <input
          onChange={handleInputChange}
          name="FundingBusiness"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.fundingBusiness }
            : { defaultValue: candDetails?.fundingBusiness })}
        />
      </div>
      <div className="candidate-input-container">
        <p className="candidate-questions">
          What is the value of your 401k/IRA?
        </p>
        <input
          onChange={handleInputChange}
          name="EligibilityValue"
          type="number"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.eligibilityValue }
            : { defaultValue: candDetails?.eligibilityValue })}
        />
      </div>
      <div>
        <div>
          <p className="candidate-questions">
            Have you been in the military or could you qualify for a VA loan? Do
            you qualify for any of these discounts
          </p>
        </div>
        <select
          onChange={handleInputChange}
          name="VALoan"
          id="Qualify"
          className="candidate-select w-full"
        >
          {militaryOptions.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.vALoan
                  : candDetails?.vALoan
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="candidate-input-container">
        <p className="candidate-questions">
          Is your current net worth over $500,000? If not, what is your current
          net worth?
        </p>
        <input
          onChange={handleInputChange}
          name="CurrentNetworth"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.currentNetworth }
            : { defaultValue: candDetails?.currentNetworth })}
        />
      </div>
      <div className="flex flex-col">
        <p className="candidate-questions">
          Have you or your spouse ever been convicted of something other than a
          minor traffic violation?
        </p>
        <ul className="flex mt-3 items-center">
          <li className="mr-4 flex items-center">
            <input
              onChange={handleInputChange}
              type="radio"
              className="mr-2"
              name="TrafficViolation"
              defaultValue="true"
              {...(candNames && candNames.length > 0
                ? { checked: selectedDetails?.trafficViolation === "true" }
                : {
                    defaultChecked: candDetails?.trafficViolation === "true",
                  })}
            />
            <label
              className="candidate-radio-text"
              htmlFor="Have you or your spouse ever been convicted of something other
          than a minor traffic violation?_yes"
            >
              Yes
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={handleInputChange}
              type="radio"
              className="mr-2"
              name="TrafficViolation"
              defaultValue="false"
              {...(candNames && candNames.length > 0
                ? { checked: selectedDetails?.trafficViolation === "false" }
                : {
                    defaultChecked: candDetails?.trafficViolation === "false",
                  })}
            />
            <label
              className="candidate-radio-text"
              htmlFor="Have you or your spouse ever been convicted of something other
          than a minor traffic violation?_no"
            >
              No
            </label>
          </li>
        </ul>
      </div>
      <div className="flex flex-col">
        <p className="candidate-questions">
          Are you or your spouse subject to a pending litigation or unsatisfied
          judgment?
        </p>
        <ul className="flex mt-3 items-center mt-3">
          <li className="mr-4 flex items-center">
            <input
              onChange={handleInputChange}
              type="radio"
              className="mr-2"
              name="Unsatisfiedjudgment"
              defaultValue="true"
              {...(candNames && candNames.length > 0
                ? { checked: selectedDetails?.unSatisfiedJudgment === "true" }
                : {
                    defaultChecked: candDetails?.unSatisfiedJudgment === "true",
                  })}
            />
            <label
              className="candidate-radio-text"
              htmlFor="Are you or your spouse subject to a pending litigation or unsatisfied judgment?_yes"
            >
              Yes
            </label>
          </li>
          <li className="flex items-center">
            <input
              onChange={handleInputChange}
              type="radio"
              className="mr-2"
              name="Unsatisfiedjudgment"
              defaultValue="false"
              {...(candNames && candNames.length > 0
                ? { checked: selectedDetails?.unSatisfiedJudgment === "false" }
                : {
                    defaultChecked:
                      candDetails?.unSatisfiedJudgment === "false",
                  })}
            />
            <label
              className="candidate-radio-text"
              htmlFor="Are you or your spouse subject to a pending litigation or unsatisfied judgment?_no"
            >
              No
            </label>
          </li>
        </ul>
      </div>
      <div className="candidate-input-container">
        <p className="candidate-questions">
          Have you or your spouse ever declared bankruptcy? If yes, when was it
          discharged?
        </p>
        <input
          onChange={handleInputChange}
          name="Bankruptcy"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.bankruptcy }
            : { defaultValue: candDetails?.bankruptcy })}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="candidate-questions">
          Notes
        </label>
        <textarea
          onChange={handleInputChange}
          name="EligibilityNote"
          id="message"
          rows={10}
          className="candidate-input"
          defaultValue={candDetails?.EligibilityNote}
        />
      </div>

      {/* button container */}
      {/* lekn hume pehle step ke ilawa baaki saaray steps may previous button bhi chaye hoga agr kisi ko back jana ho to */}
      <div
        id="button-container-initial"
        className="flex justify-center items-center mt-5 md:gap-10 max-md:flex-col max-md:gap-5"
      >
        <button
          className="candidate-btn w-72 flex items-center justify-between"
          onClick={() => setStep((prevStep) => prevStep - 1)}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          Initial
        </button>
        <button
          className="candidate-btn w-72 flex items-center justify-between"
          onClick={() => setStep((prevStep) => prevStep + 1)}
        >
          Experience
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Eligibility;