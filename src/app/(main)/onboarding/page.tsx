"use client";

import { useState, useActionState } from "react";
import { completeProfile, type ProfileActionResult } from "@/actions/profile";

const initialState: ProfileActionResult = {};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [state, formAction, isPending] = useActionState(completeProfile, initialState);
  const [salary, setSalary] = useState("500000");

  const [localError, setLocalError] = useState("");

  const nextStep = () => {
    setLocalError("");
    const form = document.getElementById("onboarding-form") as HTMLFormElement;
    if (step === 1) {
      if (!form.fullName.value || !form.age.value || !form.state.value) {
        setLocalError("Please fill out all fields.");
        return;
      }
    }
    if (step === 2) {
      // Radio buttons usually have a value by default, but just in case
    }
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen font-sans text-[var(--color-eg-text-primary)] antialiased flex flex-col items-center justify-start pt-24 pb-12 px-5 md:px-16 w-full max-w-[1440px] mx-auto">
      {/* Main Content Canvas */}
      <main className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        {/* Error message */}
        {(state.error || localError) && (
          <div className="w-full mb-6 p-4 rounded-xl bg-[var(--color-eg-error-light)] text-[var(--color-eg-error)] text-sm font-medium shadow-[var(--shadow-eg-sm)]">
            {state.error || localError}
          </div>
        )}

        <form id="onboarding-form" action={formAction} className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* STEP 1: IDENTITY */}
          <div className={step === 1 ? "contents" : "hidden"}>
            {/* Header Card */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-12 flex flex-col md:flex-row justify-between md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-[32px] font-bold text-[var(--color-eg-text-primary)] mb-2">Establish Identity</h2>
                <p className="text-base text-[var(--color-eg-text-secondary)]">Please provide your basic information to begin the verification process.</p>
              </div>
              <div className="md:w-1/2 relative w-full">
                <div className="flex items-center justify-between relative z-10 pt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-accent)] border-2 border-[var(--color-eg-text-primary)] flex items-center justify-center text-sm font-bold shadow-sm relative z-10">1</div>
                    <span className="text-xs font-semibold absolute -top-2 whitespace-nowrap">Identity</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-surface)] border-2 border-[var(--color-eg-surface-highest)] flex items-center justify-center text-sm font-semibold text-[var(--color-eg-text-muted)] relative z-10">2</div>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-surface)] border-2 border-[var(--color-eg-surface-highest)] flex items-center justify-center text-sm font-semibold text-[var(--color-eg-text-muted)] relative z-10">3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Full Legal Name</label>
              <input id="fullName" name="fullName" type="text" placeholder="e.g., Jane Doe" required={step === 1}
                className="w-full h-14 px-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] transition-all" />
            </div>

            {/* Age Field */}
            <div className="col-span-1 md:col-span-1 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <label htmlFor="age" className="block text-sm font-semibold mb-2">Age</label>
              <input id="age" name="age" type="number" min="18" max="120" placeholder="YY" required={step === 1}
                className="w-full h-14 px-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] transition-all" />
            </div>

            {/* State Field */}
            <div className="col-span-1 md:col-span-3 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <label htmlFor="state" className="block text-sm font-semibold mb-2">State of Residence</label>
              <div className="relative">
                <select id="state" name="state" required={step === 1} defaultValue=""
                  className="w-full h-14 px-4 pr-12 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] appearance-none cursor-pointer">
                  <option value="" disabled>Select a state/UT...</option>
                  <option value="andhra_pradesh">Andhra Pradesh</option>
                  <option value="arunachal_pradesh">Arunachal Pradesh</option>
                  <option value="assam">Assam</option>
                  <option value="bihar">Bihar</option>
                  <option value="chhattisgarh">Chhattisgarh</option>
                  <option value="goa">Goa</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="haryana">Haryana</option>
                  <option value="himachal_pradesh">Himachal Pradesh</option>
                  <option value="jharkhand">Jharkhand</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="kerala">Kerala</option>
                  <option value="madhya_pradesh">Madhya Pradesh</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="manipur">Manipur</option>
                  <option value="meghalaya">Meghalaya</option>
                  <option value="mizoram">Mizoram</option>
                  <option value="nagaland">Nagaland</option>
                  <option value="odisha">Odisha</option>
                  <option value="punjab">Punjab</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="sikkim">Sikkim</option>
                  <option value="tamil_nadu">Tamil Nadu</option>
                  <option value="telangana">Telangana</option>
                  <option value="tripura">Tripura</option>
                  <option value="uttar_pradesh">Uttar Pradesh</option>
                  <option value="uttarakhand">Uttarakhand</option>
                  <option value="west_bengal">West Bengal</option>
                  <option value="andaman_and_nicobar_islands">Andaman and Nicobar Islands</option>
                  <option value="chandigarh">Chandigarh</option>
                  <option value="dadra_and_nagar_haveli_and_daman_and_diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="delhi">Delhi</option>
                  <option value="jammu_and_kashmir">Jammu and Kashmir</option>
                  <option value="ladakh">Ladakh</option>
                  <option value="lakshadweep">Lakshadweep</option>
                  <option value="puducherry">Puducherry</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-eg-text-muted)]">expand_more</span>
              </div>
            </div>
          </div>

          {/* STEP 2: PERSONALIZE */}
          <div className={step === 2 ? "contents" : "hidden"}>
            {/* Header Card */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-12 flex flex-col md:flex-row justify-between md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-[32px] font-bold text-[var(--color-eg-text-primary)] mb-2">Personalize Your Experience</h2>
                <p className="text-base text-[var(--color-eg-text-secondary)]">Tell us a bit about yourself so we can tailor the Eligify platform to your needs.</p>
              </div>
              <div className="md:w-1/2 relative w-full">
                <div className="flex items-center justify-between relative z-10 pt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-surface)] border border-[var(--color-eg-surface-highest)] flex items-center justify-center text-sm font-semibold text-[var(--color-eg-text-muted)] relative z-10">1</div>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-accent)] border-2 border-[var(--color-eg-text-primary)] flex items-center justify-center text-sm font-bold shadow-sm relative z-10">2</div>
                    <span className="text-xs font-semibold absolute -top-2 whitespace-nowrap">Personalize</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-surface)] border border-[var(--color-eg-surface-highest)] flex items-center justify-center text-sm font-semibold text-[var(--color-eg-text-muted)] relative z-10">3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="col-span-1 md:col-span-2 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-start">
              <legend className="text-2xl font-semibold mb-6">Preferred Language</legend>
              <div className="flex flex-col gap-4">
                {[
                  { val: "english", label: "English", icon: "language" },
                  { val: "hindi", label: "Hindi", icon: "translate" },
                  { val: "spanish", label: "Spanish", icon: "record_voice_over" },
                  { val: "other", label: "Other", icon: "more_horiz" },
                ].map(lang => (
                  <label key={lang.val} className="cursor-pointer relative group">
                    <input type="radio" name="language" value={lang.val} defaultChecked={lang.val === "english"} className="peer sr-only" />
                    <div className="bg-[var(--color-eg-background)] rounded-xl p-4 flex items-center gap-3 border border-[var(--color-eg-border-strong)] transition-all peer-checked:bg-[var(--color-eg-accent)] peer-checked:border-[var(--color-eg-text-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 hover:shadow-[var(--shadow-eg-sm)]">
                      <span className="material-symbols-outlined">{lang.icon}</span>
                      <span className="text-base font-medium">{lang.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="col-span-1 md:col-span-2 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-start">
              <legend className="text-2xl font-semibold mb-2">Gender Identity</legend>
              <p className="text-xs text-[var(--color-eg-text-secondary)] font-medium mb-6">This helps us ensure inclusive communication. It is entirely optional.</p>
              <div className="flex flex-col gap-4">
                {[
                  { val: "female", label: "Female" },
                  { val: "male", label: "Male" },
                  { val: "non-binary", label: "Non-binary" },
                  { val: "prefer-not", label: "Prefer not to say", default: true },
                ].map(gender => (
                  <label key={gender.val} className="cursor-pointer relative group">
                    <input type="radio" name="gender" value={gender.val} defaultChecked={gender.default} className="peer sr-only" />
                    <div className="bg-[var(--color-eg-background)] rounded-xl p-4 flex items-center gap-3 border border-[var(--color-eg-border-strong)] transition-all peer-checked:bg-[var(--color-eg-accent)] peer-checked:border-[var(--color-eg-text-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 hover:shadow-[var(--shadow-eg-sm)]">
                      <span className="text-base font-medium">{gender.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: PROFESSIONAL DETAILS */}
          <div className={step === 3 ? "contents" : "hidden"}>
            {/* Header Card */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-12 flex flex-col md:flex-row justify-between md:items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-[32px] font-bold text-[var(--color-eg-text-primary)] mb-2">Professional Details</h2>
                <p className="text-base text-[var(--color-eg-text-secondary)]">Finalizing your civic profile to match you with relevant schemes.</p>
              </div>
              <div className="md:w-1/2 relative w-full">
                <div className="flex items-center justify-between relative z-10 pt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] flex items-center justify-center text-sm shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] flex items-center justify-center text-sm shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                  </div>
                  <div className="flex-1 h-[2px] bg-[var(--color-eg-surface-highest)] mx-2 relative z-0"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-eg-accent)] border-2 border-[var(--color-eg-text-primary)] flex items-center justify-center text-sm font-bold shadow-sm relative z-10">3</div>
                    <span className="text-xs font-semibold absolute -top-2 whitespace-nowrap">Professional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupation */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <label htmlFor="occupation" className="block text-sm font-semibold mb-2">Current Occupation</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-eg-text-muted)] group-focus-within:text-[var(--color-eg-text-primary)] pointer-events-none transition-colors">work</span>
                <select id="occupation" name="occupation" required={step === 3} defaultValue=""
                  className="w-full h-14 pl-12 pr-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] appearance-none cursor-pointer">
                  <option value="" disabled>Select an industry...</option>
                  <option value="tech">Technology & Software</option>
                  <option value="healthcare">Healthcare & Medical</option>
                  <option value="education">Education & Research</option>
                  <option value="finance">Finance & Accounting</option>
                  <option value="government">Public Sector & Government</option>
                  <option value="farmer">Farmer / Agriculture</option>
                  <option value="doctor">Doctor</option>
                  <option value="student">Student</option>
                  <option value="other">Other / Independent</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-eg-text-muted)]">expand_more</span>
              </div>
            </div>

            {/* Employment Status */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <label className="block text-sm font-semibold mb-3">Employment Status</label>
              <div className="flex flex-wrap gap-3">
                {["Full-Time", "Part-Time", "Self-Employed", "Unemployed"].map(status => (
                  <label key={status} className="cursor-pointer">
                    <input type="radio" name="status" value={status} defaultChecked={status === "Full-Time"} className="peer sr-only" />
                    <div className="px-4 py-2 rounded-full border border-[var(--color-eg-border-strong)] text-sm font-medium text-[var(--color-eg-text-secondary)] peer-checked:bg-[var(--color-eg-text-primary)] peer-checked:text-[var(--color-eg-text-inverse)] peer-checked:border-[var(--color-eg-text-primary)] transition-all">
                      {status}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col justify-center transition-all hover:shadow-[var(--shadow-eg-md)]">
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="salary" className="block text-sm font-semibold">Annual Salary Range</label>
                <span className="text-2xl font-bold text-[var(--color-eg-text-primary)]">₹{Number(salary).toLocaleString('en-IN')}</span>
              </div>
              <div className="relative w-full">
                <input id="salary" name="salary" type="range" min="0" max="2500000" step="50000"
                  value={salary} onChange={(e) => setSalary(e.target.value)}
                  className="w-full h-2 bg-[var(--color-eg-surface-highest)] rounded-lg appearance-none cursor-pointer accent-[var(--color-eg-text-primary)]"
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-[var(--color-eg-text-muted)] mt-2">
                <span>₹0</span>
                <span>₹25L+</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="col-span-1 md:col-span-4 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-6 sm:px-10 sm:py-6 flex items-center justify-between mt-2">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="text-sm font-semibold text-[var(--color-eg-text-secondary)] hover:text-[var(--color-eg-text-primary)] transition-colors flex items-center gap-2 group">
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button type="button" onClick={nextStep} className="h-14 px-8 bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group">
                Next Step
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            ) : (
              <button type="submit" disabled={isPending} className="h-14 px-8 bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group disabled:opacity-50">
                {isPending ? "Validating..." : "Complete Profile"}
                {!isPending && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
            )}
          </div>

        </form>
      </main>

      {/* Decorative Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-eg-accent)]/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-eg-surface-highest)]/40 blur-[120px]"></div>
      </div>
    </div>
  );
}
