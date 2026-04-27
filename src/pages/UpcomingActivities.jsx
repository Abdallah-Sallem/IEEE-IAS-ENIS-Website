import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero/Hero';

const events = [
  {
    id: 1,
    title: "ENIF 6.0",
    subtitle: "ENIS Industrial Forum.",
    date: "November 29th, 2025",
    location: "ENIS",
    overview: "The ENIS Industrial Forum, now soaring into its sixth awe-inspiring edition. ENIF isn't just an event, it's a dynamic hub where ideas take flight, innovation knows no limits, and creativity reshapes industries. Get ready for a groundbreaking revelation that promises to revolutionize technology and inspire progress. Stay tuned because ENIF 6.0 is about to ignite your passion for innovation like never before.",
    agenda: "Coming soon",
    description: "ENIF is an event organized by the IEEE Industrial Applications Society (IAS) ENIS Student Branch Chapter. It focuses on the advancement of theory in electronic and electrical...",
    image: "https://ias-enis.ieee.tn/assets/img/UpcommingEvents/enif.jpg",
  },
  {
    id: 2,
    title: "Industrial Visit",
    subtitle: "Industrial Visit to Technopole El Ghazala.",
    date: "May 21st, 2025",
    location: "Technopole El Ghazala - Ariana, Tunisia",
    overview: "Join us for an exclusive industrial visit to Tech Innovations Inc, a leading player in the realm of technology and innovation. This visit offers a unique opportunity for students and professionals alike to gain insights into the latest advancements in IT, witness cutting-edge technologies in action, and engage with industry experts.",
    agenda: "Coming soon!\nDon't miss this incredible opportunity to immerse yourself in the dynamic world of IT and gain firsthand experience from industry leaders at Tech Innovations Inc. Reserve your spot today!",
    description: "Join us for an exciting Industrial Visit organized by the IEEE ENIS IAS student chapter! This visit will provide a firsthand look at the inner workings of a leading industry player...",
    image: "https://ias-enis.ieee.tn/assets/img/UpcommingEvents/sortie%20industrielle.jpg",
  },
  {
    id: 3,
    title: "IEEE IAS ENIS SBC Industrial day",
    subtitle: "Discovering the Icons of the World of Industry",
    date: "April 19th, 2025",
    location: "Coming soon",
    overview: "Join us for an electrifying day of discovery and engagement at the IEEE Industrial Day event, where we'll uncover the \"icons\" of the industry world. This event is designed to captivate IEEE members, enticing them to join the IEEE Industry Applications Society (IAS) chapter, and to explore the dynamic landscape of industrial innovation.",
    agenda: "Coming soon!",
    description: "Dive into the world of smart systems at ENIS SB IEEE IAS Day! This student-led event, organized by the IEEE Industrial Applications Society (IAS) ENIS Student Branch Chapter...",
    image: "https://ias-enis.ieee.tn/assets/img/UpcommingEvents/iaslogobg.jpg",
  },
];

const workshops = [
  {
    id: 4,
    title: "ReactJS bootcamp",
    subtitle: "Collaboration with IEEE CS ENIS SBC",
    date: "April 30th, 2025",
    location: "National Engineering School of Sfax",
    overview: "The bootcamp will focus on the ReactJS framework, covering everything from fundamental concepts to advanced development techniques. Participants will learn about key React features, such as components, state management, and the virtual DOM. Hands-on exercises and projects will allow attendees to gain practical experience building dynamic and responsive web applications using modern tools like React Router, Redux, and Next.js. Experts in the field will guide participants through best practices, performance optimization, and deployment strategies to help them become proficient in ReactJS development.",
    agenda: "Coming soon",
    description: "Collaboration with IEEE CS ENIS SBC A ReactJS bootcamp at the National Engineering School of Sfax, covering core concepts, hands-on projects, and expert-led best practices for modern web development...",
    image: "https://ias-enis.ieee.tn/assets/img/upcomingWorkshops/workshop2.jpg",
  },
  {
    id: 5,
    title: "Exploring the IAS Chapter",
    subtitle: "Discovering the Icons of the World of Industry application society",
    date: "May, 2025",
    location: "Online",
    overview: "Collaboration with the Tunisia section, this session will delve into the history and significance of the IAS Chapter, highlighting the diverse opportunities it offers to members. We aim to provide a comprehensive overview that will inspire participation and involvement.",
    agenda: "Coming soon",
    description: "Collaboration with the Tunisia section, This session dives into the IAS Chapter's history and its importance for members. We'll explore the diverse opportunities it offers, inspiring you to get involved...",
    image: "https://ias-enis.ieee.tn/assets/img/upcomingWorkshops/iaslogobg.jpg",
  },
  {
    id: 6,
    title: "Becoming a Young Professional",
    subtitle: "Becoming a Young Professional: Processes, Benefits, and Beyond",
    date: "May, 2025",
    location: "Online",
    overview: "Collaboration with the Tunisia section, this session will delve into the history and significance of the IAS Chapter, highlighting the diverse opportunities it offers to members. We aim to provide a comprehensive overview that will inspire participation and involvement.",
    agenda: "Coming soon",
    description: "Collaboration with the Tunisia section this session, guides you through becoming a young professional within IEEE Learn about benefits, networking...",
    image: "https://ias-enis.ieee.tn/assets/img/upcomingWorkshops/iaslogobg.jpg",
  },
];

export default function UpcomingActivities() {
  useDocumentTitle('Upcoming Activities', 'See upcoming IEEE IAS ENIS SBC events, conferences, workshops, and industrial visits.');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      <Hero title="Upcoming Activities" isHome={false} />

      {/* ══════ SECTION 1: Upcoming Events ══════ */}
      <section className="py-12 px-4">
        <h2
          className="text-center font-bold mb-8"
          style={{ color: '#16a34a', fontSize: '1.75rem' }}
        >
          Upcoming Events
        </h2>

        {/* flex-wrap centered — matches Bootstrap d-flex justify-content-center flex-wrap */}
        <div className="flex flex-wrap justify-center">
          {events.map((item) => (
            /* m-4 wrapper — matches Bootstrap m-4 */
            <div key={item.id} className="m-6">
              {/* card shadow — visible box shadow on each card */}
              <div
                className="bg-white overflow-hidden flex flex-col h-full"
                style={{
                  width: '25rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,.1)',
                  gap: '20px',
                  borderRadius: '10px',
                }}
              >
                {/* card-img-top — full-bleed, top corners rounded */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                  style={{
                    height: '200px',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
                {/* card-body text-center */}
                <div className="p-4 text-center flex flex-col flex-grow items-center">
                  <h5 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">{item.description}</p>
                  {/* btn btn-secondary */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    style={{
                      backgroundColor: '#15803d',
                      color: 'white',
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166534'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ SECTION 2: Upcoming Workshops ══════ */}
      <section className="py-12 px-4">
        <h2
          className="text-center font-bold mb-8"
          style={{ color: '#16a34a', fontSize: '1.75rem' }}
        >
          Upcoming Workshops
        </h2>

        <div className="flex flex-wrap justify-center">
          {workshops.map((item) => (
            <div key={item.id} className="m-6">
              <div
                className="bg-white overflow-hidden flex flex-col h-full"
                style={{
                  width: '25rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,.1)',
                  gap: '20px',
                  borderRadius: '10px',


                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                  style={{
                    height: '200px',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
                <div className="p-4 text-center flex flex-col flex-grow items-center">
                  <h5 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">{item.description}</p>
                  <button
                    onClick={() => setSelectedItem(item)}
                    style={{
                      backgroundColor: '#15803d',
                      color: 'white',
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166534'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ MODAL ══════ */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden flex flex-col"
            style={{ width: '850px', maxWidth: '92vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Image header ── */}
            <div className="relative flex-shrink-0" style={{ height: '280px' }}>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white text-2xl leading-none hover:opacity-80 transition-opacity"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* ── Modal body (scrollable) ── */}
            <div className="p-8 overflow-y-auto" style={{ flex: '1 1 auto' }}>
              {/* Green centered title */}
              <h2
                className="text-center font-bold mb-4"
                style={{ color: '#15803d', fontSize: '2rem' }}
              >
                {selectedItem.title}
              </h2>

              {/* Subtitle centered */}
              <p className="text-center text-gray-500 mb-8" style={{ fontSize: '1rem' }}>
                {selectedItem.subtitle}
              </p>

              {/* Date */}
              <h5 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.1rem' }}>Date:</h5>
              <p className="text-gray-600 mb-5">{selectedItem.date}</p>

              {/* Location */}
              <h5 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.1rem' }}>Location:</h5>
              <p className="text-gray-600 mb-5">{selectedItem.location}</p>

              {/* Overview */}
              <h5 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.1rem' }}>Overview:</h5>
              <p className="text-gray-600 leading-relaxed mb-5">{selectedItem.overview}</p>

              {/* Agenda */}
              <h5 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.1rem' }}>Agenda:</h5>
              <p className="text-gray-600 whitespace-pre-line mb-2">{selectedItem.agenda}</p>
            </div>

            {/* ── Footer with green buttons ── */}
            <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  backgroundColor: '#15803d',
                  color: 'white',
                  padding: '10px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166534'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
              >
                Close
              </button>
              <a
                href="https://www.linkedin.com/company/ieee-ias-enis"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#15803d',
                  color: 'white',
                  padding: '10px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166534'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
