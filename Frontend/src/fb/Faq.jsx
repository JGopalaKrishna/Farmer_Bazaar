import React from 'react';
import './FarmerHomePage1.css'

export const FAQ=()=> { 
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a variety of services including farm management software, expert advice, and access to agricultural resources."
    },
    {
      question: "How can I create an account?",
      answer: "You can create an account by clicking on the 'Register' button at the top-right corner of the page and filling out the required information."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, click on the 'Forgot Password?' link on the login page and follow the instructions to reset it."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support via email at gkfarmerbazaar@gmail.com or by filling out the contact form on our website."
    }
  ];

  return (
    <div className="faq-section" id='faq'>
      <h3>Frequently Asked Questions</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h4 className="faq-question">{faq.question}</h4>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}