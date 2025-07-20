import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternships } from '../features/internships/internshipSlice';

const faqData = [
  {
    question: 'What are the eligibility requirements?',
    answer: `We welcome applications from students currently enrolled in undergraduate or graduate programs, as well as recent graduates (within 1 year). Strong academic performance, relevant coursework, and a passion for learning are key requirements. Some positions may have specific technical prerequisites which are listed in the job description.`
  },
  {
    question: 'How long do internships typically last?',
    answer: `Our internship durations are flexible to accommodate different academic schedules. We offer 30-day, 45-day, 90-day, and 180-day programs. Most interns choose 90-day programs as they provide the optimal balance of learning and project contribution. Longer internships often lead to more substantial projects and potential full-time opportunities.`
  },
  {
    question: 'Are internships paid?',
    answer: `Our internships are unpaid positions focused on providing valuable learning experiences, mentorship, and industry exposure. While we don't offer monetary compensation, we provide comprehensive benefits including training programs, networking opportunities, certificates, and potential full-time job offers for outstanding performers.`
  },
  {
    question: 'Can I work remotely?',
    answer: `We offer flexible work arrangements including remote, hybrid, and on-site options. Most of our internships can be completed remotely with proper communication tools and regular check-ins. We provide all necessary software licenses and equipment for remote work.`
  },
  {
    question: 'What happens after the internship?',
    answer: `Outstanding interns often receive full-time job offers upon completion. We maintain strong relationships with our alumni and provide networking opportunities, references, and ongoing career support. Many former interns have gone on to successful careers both within and outside our organization.`
  },
  {
    question: 'How do I apply?',
    answer: `Simply click the "Apply Now" button on any internship listing that interests you. You'll need to submit a resume, cover letter, and any relevant portfolio materials. We review applications on a rolling basis and typically respond within 1-2 weeks. Make sure to highlight relevant coursework, projects, and skills in your application.`
  },
];

const InternshipPage = () => {
  const dispatch = useDispatch();
  const { items: internshipData, loading, error } = useSelector(state => state.internships);

  useEffect(() => {
    dispatch(fetchInternships());
  }, [dispatch]);

  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('deadline');
  const [showSaved, setShowSaved] = useState(false);
  const [savedInternships, setSavedInternships] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 3;

  // Load saved internships from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedInternships');
    if (saved) {
      setSavedInternships(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when savedInternships changes
  useEffect(() => {
    localStorage.setItem('savedInternships', JSON.stringify(savedInternships));
  }, [savedInternships]);

  const toggleSaved = (internshipId) => {
    setSavedInternships(prev => 
      prev.includes(internshipId) 
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
  };

  const filtered = internshipData.filter(item => {
    const matchesDomain = !selectedDomain || item.domain === selectedDomain;
    const matchesDuration = !selectedDuration || item.duration.includes(selectedDuration);
    const matchesLocation = !selectedLocation || item.location.includes(selectedLocation);
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = !showSaved || savedInternships.includes(item.id);
    
    return matchesDomain && matchesDuration && matchesLocation && matchesSearch && matchesSaved;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'salary':
        return Math.min(...a.duration) - Math.min(...b.duration);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearFilters = () => {
    setSelectedDomain('');
    setSelectedDuration(null);
    setSelectedLocation('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  // Add loading and error states
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading internships...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Internships at TeachAdvise
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Launch your career with hands-on experience in a dynamic educational technology company
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="font-semibold">{internshipData.length}</span> Open Positions
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="font-semibold">Remote & Hybrid</span> Options
              </div>
                             <div className="bg-white/20 px-4 py-2 rounded-full">
                 <span className="font-semibold">Learning</span> Experience
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search internships by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="deadline">Sort by: Application Deadline</option>
                <option value="salary">Sort by: Duration (Short to Long)</option>
                <option value="title">Sort by: Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filters Dropdown Button */}
          <div className="mb-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors focus:outline-none"
              onClick={() => setShowFilters((prev) => !prev)}
              aria-expanded={showFilters}
            >
              <span>Filters</span>
              <svg
                className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Collapsible Filter Section */}
          {showFilters && (
            <div className="space-y-4 mb-4 animate-fadein">
              {/* Domain Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDomain('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDomain === '' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Domains
                  </button>
                  {['Marketing', 'Tech', 'Design', 'Finance', 'HR'].map(domain => (
                    <button
                      key={domain}
                      onClick={() => setSelectedDomain(domain)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDomain === domain 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDuration(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDuration === null 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Any Duration
                  </button>
                  {[30, 45, 90, 180].map(duration => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDuration === duration 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLocation('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedLocation === '' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Locations
                  </button>
                  {['Remote', 'Hybrid', 'On-site'].map(location => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedLocation === location 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Filter Actions */}
          <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showSaved 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Saved Only
              </button>
              <span className="text-sm text-gray-600">
                {filtered.length} of {internshipData.length} internships
              </span>
            </div>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {paginated.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No internships found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            paginated.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            {item.urgent && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                Urgent
                              </span>
                            )}
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              item.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-gray-600">{item.company} • {item.location}</p>
                        </div>
                        <button
                          onClick={() => toggleSaved(item.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            savedInternships.includes(item.id)
                              ? 'text-yellow-600 hover:text-yellow-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <svg className="h-5 w-5" fill={savedInternships.includes(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                 <div>
                           <p className="text-gray-500">Compensation</p>
                           <p className="font-medium text-gray-900">{item.salary}</p>
                         </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900">{item.duration.join(', ')} days</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Deadline</p>
                          <p className="font-medium text-gray-900">{formatDate(item.deadline)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Days Left</p>
                          <p className={`font-medium ${getDaysUntilDeadline(item.deadline) <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                            {getDaysUntilDeadline(item.deadline)} days
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{item.description}</p>

                      {expandedCard === item.id && (
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {item.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {item.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 pt-4">
                        <button
                          onClick={() => setExpandedCard(expandedCard === item.id ? null : item.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {expandedCard === item.id ? 'Show Less' : 'View Details'}
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          Apply Now
                        </button>
                        <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                          Save for Later
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-64 lg:flex-shrink-0">
                      <div 
                        className="w-full h-48 rounded-xl bg-cover bg-center shadow-md"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = currentPage === pageNum;
                  const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;
                  const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
                  
                  if (isCurrent || isNearCurrent || isFirstOrLast) {
                    return (
                      <button
                        key={i}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          isCurrent 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="px-2 py-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know about our internship program</p>
        </div>
        
        <div className="space-y-6">
          {faqData.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg">
              <button
                className="w-full flex items-center justify-between p-6 focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="text-lg font-semibold text-gray-900 text-left">{faq.question}</span>
                <svg
                  className={`h-6 w-6 text-gray-400 transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-6 pb-6 text-gray-700 leading-relaxed animate-fadein"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our team is here to help you find the perfect internship opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;
