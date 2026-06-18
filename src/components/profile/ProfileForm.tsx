"use client";

import { useActionState, useState } from "react";
import { updateProfile, type ProfileActionResult } from "@/actions/profile";

const initialState: ProfileActionResult = {};

export default function ProfileForm({ initialData }: { initialData: Record<string, string | number | null> }) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState);
  const [salary, setSalary] = useState(initialData.annualIncome || "300000");

  return (
    <div className="w-full">
      {state.error && (
        <div className="w-full mb-6 p-4 rounded-xl bg-[var(--color-eg-error-light)] text-[var(--color-eg-error)] text-sm font-medium shadow-[var(--shadow-eg-sm)]">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="w-full mb-6 p-4 rounded-xl bg-[var(--color-eg-success-light)] text-[var(--color-eg-success-dark)] text-sm font-medium shadow-[var(--shadow-eg-sm)] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Profile updated successfully!
        </div>
      )}

      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Section 1: Identity */}
        <div className="col-span-1 md:col-span-2 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col transition-all hover:shadow-[var(--shadow-eg-md)]">
          <h3 className="text-xl font-bold mb-6 text-[var(--color-eg-text-primary)] border-b border-[var(--color-eg-surface-highest)] pb-4">Identity & Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Full Legal Name</label>
              <input id="fullName" name="fullName" type="text" defaultValue={initialData.fullName || ""} required
                className="w-full h-12 px-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] transition-all" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="age" className="block text-sm font-semibold mb-2">Age</label>
              <input id="age" name="age" type="number" min="18" max="120" defaultValue={initialData.age || ""} required
                className="w-full h-12 px-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base placeholder:text-[var(--color-eg-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] transition-all" />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="state" className="block text-sm font-semibold mb-2">State of Residence</label>
              <div className="relative">
                <select id="state" name="state" required defaultValue={initialData.state || ""}
                  className="w-full h-12 px-4 pr-12 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] appearance-none cursor-pointer">
                  <option value="" disabled>Select a jurisdiction...</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CT">Chhattisgarh</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UT">Uttarakhand</option>
                  <option value="WB">West Bengal</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="LA">Ladakh</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-eg-text-muted)]">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Personalization */}
        <div className="col-span-1 md:col-span-2 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col transition-all hover:shadow-[var(--shadow-eg-md)]">
          <h3 className="text-xl font-bold mb-6 text-[var(--color-eg-text-primary)] border-b border-[var(--color-eg-surface-highest)] pb-4">Personalization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <legend className="text-sm font-semibold mb-3">Preferred Language</legend>
              <div className="flex flex-col gap-3">
                {[
                  { val: "english", label: "English", icon: "language" },
                  { val: "hindi", label: "Hindi", icon: "translate" },
                  { val: "spanish", label: "Spanish", icon: "record_voice_over" },
                  { val: "other", label: "Other", icon: "more_horiz" },
                ].map(lang => (
                  <label key={lang.val} className="cursor-pointer relative group">
                    <input type="radio" name="language" value={lang.val} defaultChecked={(initialData.preferredLanguage || "english") === lang.val} className="peer sr-only" />
                    <div className="bg-[var(--color-eg-background)] rounded-xl p-3 flex items-center gap-3 border border-[var(--color-eg-border-strong)] transition-all peer-checked:bg-[var(--color-eg-accent)] peer-checked:border-[var(--color-eg-text-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 hover:shadow-[var(--shadow-eg-sm)]">
                      <span className="material-symbols-outlined text-[18px]">{lang.icon}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <legend className="text-sm font-semibold mb-3">Gender Identity</legend>
              <div className="flex flex-col gap-3">
                {[
                  { val: "female", label: "Female" },
                  { val: "male", label: "Male" },
                  { val: "non-binary", label: "Non-binary" },
                  { val: "prefer-not", label: "Prefer not to say" },
                ].map(gender => (
                  <label key={gender.val} className="cursor-pointer relative group">
                    <input type="radio" name="gender" value={gender.val} defaultChecked={(initialData.gender || "prefer-not") === gender.val} className="peer sr-only" />
                    <div className="bg-[var(--color-eg-background)] rounded-xl p-3 flex items-center gap-3 border border-[var(--color-eg-border-strong)] transition-all peer-checked:bg-[var(--color-eg-accent)] peer-checked:border-[var(--color-eg-text-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 hover:shadow-[var(--shadow-eg-sm)]">
                      <span className="text-sm font-medium">{gender.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Professional */}
        <div className="col-span-1 md:col-span-2 bg-[var(--color-eg-surface)] rounded-3xl shadow-[var(--shadow-eg-sm)] border border-[var(--color-eg-border)] p-8 sm:p-10 flex flex-col transition-all hover:shadow-[var(--shadow-eg-md)]">
          <h3 className="text-xl font-bold mb-6 text-[var(--color-eg-text-primary)] border-b border-[var(--color-eg-surface-highest)] pb-4">Professional Details</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label htmlFor="occupation" className="block text-sm font-semibold mb-2">Current Occupation</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-eg-text-muted)] group-focus-within:text-[var(--color-eg-text-primary)] pointer-events-none transition-colors">work</span>
                <select id="occupation" name="occupation" required defaultValue={initialData.occupation || ""}
                  className="w-full h-12 pl-12 pr-4 bg-[var(--color-eg-surface)] border border-[var(--color-eg-border-strong)] rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-eg-border-focus)] appearance-none cursor-pointer">
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

            <div className="flex flex-col">
              <label className="block text-sm font-semibold mb-3">Employment Status</label>
              <div className="flex flex-wrap gap-3">
                {["Full-Time", "Part-Time", "Self-Employed", "Unemployed"].map(status => (
                  <label key={status} className="cursor-pointer">
                    <input type="radio" name="status" value={status} defaultChecked={(initialData.employmentStatus || "Full-Time") === status} className="peer sr-only" />
                    <div className="px-4 py-2 rounded-full border border-[var(--color-eg-border-strong)] text-sm font-medium text-[var(--color-eg-text-secondary)] peer-checked:bg-[var(--color-eg-text-primary)] peer-checked:text-[var(--color-eg-text-inverse)] peer-checked:border-[var(--color-eg-text-primary)] transition-all">
                      {status}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="salary" className="block text-sm font-semibold">Annual Salary Range</label>
                <span className="text-xl font-bold text-[var(--color-eg-text-primary)]">₹{Number(salary).toLocaleString('en-IN')}</span>
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
        </div>

        {/* Action Area */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
          <button type="submit" disabled={isPending} className="h-12 px-8 bg-[var(--color-eg-text-primary)] text-[var(--color-eg-text-inverse)] text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 group disabled:opacity-50 disabled:pointer-events-none">
            {isPending ? "Saving..." : "Save Changes"}
            {!isPending && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">save</span>}
          </button>
        </div>

      </form>
    </div>
  );
}
