import React, { useState } from "react";

const StayUpdatedSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Subscribed successfully!");
        setEmail("");
      } else {
        setError(data.message || "Subscription failed.");
      }
    } catch (err) {
      setError("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-end gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-20 bg-white">
      {/* Heading + Description */}
      <div className="flex flex-col gap-2 text-center items-center">
        <h2 className="text-[#111518] text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-8 text-center">
          Stay Updated
        </h2>
        <p className="text-[#111518] text-base font-normal leading-normal max-w-[720px]">
          Subscribe to our newsletter for the latest career tips and opportunities.
        </p>
      </div>
      {/* Email Input Form */}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[480px] h-14 md:h-16">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 text-sm md:text-base text-[#111518] placeholder-[#60768a] bg-[#f0f2f5] rounded-l-xl focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-[#0b80ee] text-white font-bold text-sm md:text-base px-5 rounded-r-xl hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
      {success && <p className="text-green-600 text-center">{success}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </section>
  );
};

export default StayUpdatedSection;
