import axios from "axios";
import React, { useState } from "react";
import PageTransition from "src/Animations/PageTransition";
import DialogBox from "src/Popups/DialogBox";
import { twMerge } from "tailwind-merge";

const FundingCalculator = () => {
  const [data, setData] = useState({
    downPayment: 0,
    houseHold: 0,
    debtPayments: 0,
    totalNet: 0,
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    setData({
      ...data,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reqFields = ["firstName", "lastName", "email"];
    let allFieldsValid = true;

    reqFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        setFormErrors((prev) => ({ ...prev, [field]: "error" }));
        allFieldsValid = false;
      } else {
        setFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    });

    try {
      if (allFieldsValid) {
        const formData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          franchiseLocation: data.franchiseLocation,
          creditScore: data.creditScore,
          launching: data.launching,
          creditHistory: data.creditHistory,
          bankruptcies: data.bankruptcies,
          percentage: data.percentage,
          realState: data.realState,
          downPayment: parseInt(data.downPayment),
          houseHold: parseInt(data.houseHold),
          debtPayments: parseInt(data.debtPayments),
          totalNet: parseInt(data.totalNet),
        };
        const response = await axios.post(
          "https://siddiqiventures-001-site4.ktempurl.com/api/fundcalculator",
          formData
        );

        if (response.status === 201) {
          setShow(true);
          setLoading(false);
          setTimeout(() => {
            setShow(false);
            window.location.href = "/";
          }, 3000);
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields",
        }));
        setLoading(false);
        window.scrollTo(0, 1000);

        // Handle invalid fields (e.g., show validation errors)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(data);

  return (
    <PageTransition>
      <div
        id="top-text"
        className="p-10  relative flex flex-col gap-2 justify-center items-center before:absolute before:content-[''] before:top-0 before:w-full before:h-full before:bg-custom-heading-color/60 md:min-h-[400px] before:z-10"
        style={{
          background: "url(/images/accounts/calculator.jpeg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="max-md:text-3xl md:text-7xl text-white  font-bold text-center z-20">
          FUND MY FRANCHISE
        </h1>
        <h3 className="max-md:text-xl md:text-3xl text-white  font-bold text-center z-20">
          Instantly See What You Could Qualify For!
        </h3>
      </div>

      <DialogBox show={show} setShow={setShow}>
        <div className="bg-white p-10">
          <p className="text-3xl text-center text-custom-heading-color">
            Message send successfully! <br /> We will contact you soon{" "}
          </p>
        </div>
      </DialogBox>

      <div
        id="description"
        className="flex flex-col  gap-5 my-10 md:max-w-7xl md:mx-auto max-md:mx-5"
      >
        <div className="max-md:text-sm md:text-xl my-5 text-center flex flex-col gap-3">
          <p className="text-center max-md:text-sm md:text-xl">
            By Rolling Your IRA, 401(K), 403(B), Keogh Or Other Retirement Funds
            Into A 401(K) Franchise Financing Vehicle
          </p>
          <p className="text-center">
            You can buy A Franchise, Lower Overhead and Increase Your Success
            Rate. Instead of sending interest payments to a lender, you can use
            your money to purchase advertising, buy equipment, lease a company
            van, or use it in any way that will bring you quicker profits.
          </p>
          <p>
            Eliminate Personal Liability. Use our own funds to avoid pledging
            your home or other assets as loan collateral and potentially
            jeopardizing your personal credit.
          </p>
          <p>
            Maximize Tax-Deferred Benefits. By investing your retirement funds
            into your own franchise, you can reinvest your profits tax-deferred
            in your business or in your retirement account. Build your business
            while you grow your retirement nest egg! Enjoy Flexibility.
          </p>

          <p>
            You can mix your retirement funds with personal funds or capital
            from other investors. It’s the ideal financing structure for
            husband-and-wife teams!
          </p>
          <p>
            Invest in Yourself. Unlike taking risks in the volatile stock
            market, financing your business with retirement funds is an
            investment in yourself & one that you can control and count on!
            Discover your retirement account’s true investing power (and the
            ability to finance your franchise with money you already have)
          </p>
        </div>

        <div className="flex flex-col text-center gap-4 ">
          <p className="font-bold text-center max-md:text-xl md:text-2xl">
            PRE-QUALIFY FOR FUNDING
          </p>
          <p className="font-bold text-center text-custom-dark-blue max-md:text-xl md:text-3xl">
            Determine How Much And What Sources Of Options <br></br> Are
            Available To You
          </p>
        </div>
        {formErrors.error && (
          <p className="border-2 border-red-600 text-red-600 p-4 flex justify-between">
            {formErrors.error}
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
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 max-md:flex-col md:flex-row">
            <div className="candidate-sub-childs">
              <p className="candidate-label">First Name</p>
              <input
                onChange={handleChange}
                type="text"
                name="firstName"
                className={twMerge(
                  `candidate-input`,
                  formErrors.firstName === "error" ? "bg-red-300" : ""
                )}
              />
            </div>
            <div className="candidate-sub-childs">
              <p className="candidate-label">Last Name</p>
              <input
                onChange={handleChange}
                type="text"
                name="lastName"
                className={twMerge(
                  `candidate-input`,
                  formErrors.lastName === "error" ? "bg-red-300" : ""
                )}
              />
            </div>
            <div className="candidate-sub-childs">
              <p className="candidate-label">Email</p>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                className={twMerge(
                  `candidate-input`,
                  formErrors.email === "error" ? "bg-red-300" : ""
                )}
              />
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                What type of franchise location are you most interested in?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  defaultValue="Homebased"
                  name="franchiseLocation"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.franchiseLocation === "Homebased" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Homebased
                </span>
              </label>

              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  defaultValue="Food and Beverage"
                  class="peer hidden"
                  name="franchiseLocation"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.franchiseLocation === "Food and Beverage" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Food and Beverage
                </span>
              </label>
            </div>
            <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="franchiseLocation"
                  defaultValue="Non Food Storefront"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.franchiseLocation === "Non Food Storefront" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Non Food Storefront
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="franchiseLocation"
                  defaultValue="Mobile Services"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.franchiseLocation === "Mobile Services" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Mobile Services
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <p className="font-bold text-black max-md:text-sm md:text-xl mb-2 ">
              How much cash do you have available for a downpayment and working
              capital (include retirement accounts)?
            </p>

            <div>
              <label
                htmlFor="steps-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DownPayment & Working Capital
              </label>
              <input
                onChange={handleChange}
                id="steps-range"
                type="range"
                name="downPayment"
                min={0}
                max={200000}
                defaultValue={0}
                step={500}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Amount: {data.downPayment}
              </p>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                What is your most recent credit score?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditScore"
                  defaultValue="below 680"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditScore === "below 680" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  below 680
                </span>
              </label>

              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditScore"
                  defaultValue="680 - 715"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditScore === "680 - 715" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  680 - 715
                </span>
              </label>
            </div>
            <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditScore"
                  defaultValue="716 - 750"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditScore === "716 - 750" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  716 - 750
                </span>
              </label>

              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditScore"
                  defaultValue="Above 750"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditScore === "Above 750" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Above 750
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                Do you have a working spouse or partner who can cover living
                expenses while the business is launching?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div class="flex md:space-x-2 rounded-xl select-none">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="launching"
                  defaultValue="Yes"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.launching === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Yes
                </span>
              </label>

              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="launching"
                  defaultValue="No"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.launching === "No" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  No
                </span>
              </label>
            </div>
            <div class="flex md:space-x-2 rounded-xl select-none">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="launching"
                  defaultValue="I have other means to cover living expenses during the launch"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.launching === "I have other means to cover living expenses during the launch" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  I have other means to cover living expenses during the launch
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
              What is your annual household income?
            </p>

            <div>
              <label
                htmlFor="household"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Annual HouseHold Income
              </label>
              <input
                onChange={handleChange}
                id="household"
                type="range"
                name="houseHold"
                min={0}
                max={500000}
                defaultValue={0}
                step={500}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Amount: {data.houseHold}
              </p>
            </div>
          </div>
          <div className="my-3">
            <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
              What are your monthly personal debt payments?
            </p>

            <div>
              <label
                htmlFor="personal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Monthly Personal Debt Payments
              </label>
              <input
                onChange={handleChange}
                id="personal"
                type="range"
                name="debtPayments"
                min={0}
                max={50000}
                defaultValue={0}
                step={500}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Amount: {data.debtPayments}
              </p>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                Do you have a minimum 5-year credit history?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div class="flex md:space-x-2 rounded-xl select-none">
              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditHistory"
                  defaultValue="Yes"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditHistory === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Yes
                </span>
              </label>

              <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="creditHistory"
                  defaultValue="No"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.creditHistory === "No" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  No
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                Bankruptcies within the last 7 years
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div className="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="bankruptcies"
                  defaultValue="Never"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.bankruptcies === "Never" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Never
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="bankruptcies"
                  defaultValue="0-7 years ago"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.bankruptcies === "0-7 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  0-7 years ago
                </span>
              </label>
            </div>
            <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="bankruptcies"
                  defaultValue="8-10 years ago"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.bankruptcies === "8-10 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  8-10 years ago
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="bankruptcies"
                  defaultValue="More than 10 years ago"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.bankruptcies === "More than 10 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  More than 10 years ago
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                On your credit cards, what percentage of the credit limit are
                you using (your statement balances divided by your credit
                limits)?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div className="flex md:space-x-2 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="percentage"
                  defaultValue="0-35%"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.percentage === "0-35%" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  0-35%
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="percentage"
                  defaultValue="36-50%"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.percentage === "36-50%" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  36-50%
                </span>
              </label>
            </div>
            <div className="flex md:space-x-2 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="percentage"
                  defaultValue="51% or higher"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.percentage === "51% or higher" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  51% or higher
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
                Do you own real estate?
              </p>
              <p className="text-red-700 italic">(Required)</p>
            </div>

            <div className="flex md:space-x-2 rounded-xl select-none">
              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="realState"
                  defaultValue="Yes"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.realState === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  Yes
                </span>
              </label>

              <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="realState"
                  defaultValue="No"
                  class="peer hidden"
                />
                <span
                  className={twMerge(
                    `candidate-funding-btn w-full ${data.realState === "No" ? "bg-custom-dark-blue text-white" : ""}`
                  )}
                >
                  No
                </span>
              </label>
            </div>
          </div>

          <div className="my-3">
            <p className="font-bold text-black max-md:text-sm md:text-xl mb-2">
              What is your total net worth?
            </p>

            <div>
              <label
                htmlFor="totalnet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Net Worth
              </label>
              <input
                onChange={handleChange}
                id="totalnet"
                type="range"
                name="totalNet"
                min={0}
                max={5000000}
                defaultValue={0}
                step={500}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Amount: {data.totalNet}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="border-2 border-custom-heading-color bg-custom-heading-color  text-white px-5 rounded hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2  font-semibold">
              Calculate My Results
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default FundingCalculator;
