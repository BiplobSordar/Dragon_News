import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-sky-700 mb-6">
        About NewsPortal
      </h1>
      <p className="text-gray-700 mb-4 text-justify leading-relaxed">
        Welcome to <span className="font-semibold text-sky-600">NewsPortal</span>, your
        go-to source for the latest news from around the world. Our mission is to deliver
        high-quality, reliable, and timely information in a user-friendly format.
      </p>
      <p className="text-gray-700 mb-4 text-justify leading-relaxed">
        Our team of dedicated journalists and editors work tirelessly to provide you with
        accurate news updates, covering topics ranging from technology, politics, business,
        world news, and more. At NewsPortal, we value integrity, transparency, and
        credibility.
      </p>
      <p className="text-gray-700 text-justify leading-relaxed">
        Thank you for trusting us to keep you informed. Stay tuned and stay updated with
        the world around you.
      </p>
    </div>
  );
}
