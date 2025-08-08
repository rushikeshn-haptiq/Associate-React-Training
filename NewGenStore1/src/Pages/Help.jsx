import React from 'react';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Help & Support</h1>

      <div className="space-y-6 text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold">📦 How can I track my order?</h2>
          <p>You can track your order by going to the "My Orders" section in your dashboard and clicking on "Track Order".</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold">💳 What payment methods are accepted?</h2>
          <p>We accept credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe.</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold">🔁 How do I return or replace a product?</h2>
          <p>You can initiate a return or replacement request from the "My Orders" page within 7 days of delivery.</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold">📧 Need more help?</h2>
          <p>Contact our support team at <a href="mailto:support@rushikesh.co" className="text-blue-500 underline">support@rushikesh.co</a> or call us at +91 9990339382.</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
