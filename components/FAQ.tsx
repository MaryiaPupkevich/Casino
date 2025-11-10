"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_DATA: FaqItem[] = [
  {
    question: "WHAT GAMES ARE PROVIDED AT JOO CASINO?",
    answer:
      "You must be 18 years or older to gamble at Cowboys Casino."
  },
  {
    question: "CAN I RESERVE A TABLE IN ADVANCE AT COWBOYS CASINO BAR?",
    answer:
      "Yes, you can book a table in advance by phone or via the booking form on the website."
  },
  {
    question: "IS THERE A DRESS CODE FOR ENTERING COWBOYS CASINO STAMPEDE?",
    answer:
      "Smart casual. Sportswear, beachwear and clothing with offensive prints are not allowed."
  },
  {
    question: "ARE THERE ANY MEMBERSHIP BENEFITS AT COWBOYS CASINO UNDERGROUND PARKING?",
    answer:
      "Members earn loyalty points, get exclusive promos and invitations to special events."
  },
  {
    question: "CAN I HOST A PRIVATE EVENT AT COWBOYS CASINO?",
    answer:
      "Yes, private events and corporate parties are available on request through the events team."
  },
  {
    question: "IS PARKING AVAILABLE AT COWBOYS CASINO?",
    answer:
      "On-site parking is available. Spaces can be limited during peak hours and big events."
  },
  {
    question: "DOES COWBOYS CASINO OFFER ANY RESPONSIBLE GAMBLING PROGRAMS?",
    answer:
      "Yes, the casino provides info, self-exclusion options and contacts for support services."
  },
  {
    question: "ARE PETS ALLOWED IN COWBOYS CASINO?",
    answer:
      "No pets are allowed, except certified service animals for guests with disabilities."
  },
  {
    question: "DOES COWBOYS CASINO HAVE FACILITIES FOR PEOPLE WITH DISABILITIES?",
    answer:
      "Yes, the venue has accessible entrances, washrooms and parking. Staff can assist if needed."
  },
  {
    question:
      "CAN I BRING CHILDREN TO THE DINING AREAS WITHIN COWBOYS CASINO?",
    answer:
      "Some dining areas may allow children at certain times; the gaming floor is 18+ only."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">FAQ</h2>

        <div className="faq-list">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-header"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                  <span className="faq-question">{item.question}</span>
                </button>

                <div className="faq-body">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
