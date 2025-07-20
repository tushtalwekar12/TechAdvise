// =======================
// Internship API Endpoints
// =======================

/**
 * PUBLIC ROUTES
 * -------------
 * 1. Get all internships
 *    GET /api/internships
 *    - Returns all internships (active and inactive)
 *
 * 2. Get all active internships
 *    GET /api/internships/active
 *    - Returns only internships where isActive: true
 *
 * 3. Get internships by status
 *    GET /api/internships/status/:status
 *    - :status = 'Open' | 'Closed' | 'Pending'
 *    - Example: /api/internships/status/Open
 *
 * 4. Get internships by domain
 *    GET /api/internships/domain/:domain
 *    - :domain = e.g. 'Tech', 'Marketing', etc.
 *    - Example: /api/internships/domain/Tech
 *
 * 5. Get urgent internships
 *    GET /api/internships/urgent
 *    - Returns internships where urgent: true and isActive: true
 *
 * 6. Get internship by ID
 *    GET /api/internships/:id
 *    - Returns a single internship by its MongoDB _id
 *
 * 
 * PROTECTED ROUTES (Admin/Superadmin only)
 * ----------------------------------------
 * 7. Create a new internship
 *    POST /api/internships
 *    - Body: {
 *        title, domain, company, location, duration, salary, deadline,
 *        status, urgent, description, requirements, benefits, image
 *      }
 *
 * 8. Update an internship
 *    PUT /api/internships/:id
 *    - Body: (same as POST, any updatable fields)
 *
 * 9. Delete an internship
 *    DELETE /api/internships/:id
 *
 * 10. Toggle isActive status (activate/deactivate)
 *     PATCH /api/internships/:id/toggle
 *
 * 11. Update internship status
 *     PATCH /api/internships/:id/status
 *     - Body: { status: 'Open' | 'Closed' | 'Pending' }
 *
 * 12. Toggle urgent status
 *     PATCH /api/internships/:id/urgent
 *
 * 
 * EXAMPLES
 * --------
 * // Create a new internship
 * POST /api/internships
 * {
 *   "title": "Software Engineering Intern",
 *   "domain": "Tech",
 *   "company": "TeachAdvise",
 *   "location": "Remote / On-site",
 *   "duration": [45, 90, 180],
 *   "salary": "Unpaid Internship",
 *   "deadline": "2025-08-01",
 *   "status": "Open",
 *   "urgent": false,
 *   "description": "Develop cutting-edge educational technology solutions...",
 *   "requirements": ["JavaScript/React knowledge", "Problem-solving skills", "Git experience", "Computer Science background"],
 *   "benefits": ["Latest tech tools", "Code review mentorship", "Portfolio projects", "Competitive salary"],
 *   "image": "https://example.com/internship-image.jpg"
 * }
 *
 * // Get all active internships
 * GET /api/internships/active
 *
 * // Get internships by domain
 * GET /api/internships/domain/Tech
 *
 * // Get urgent internships
 * GET /api/internships/urgent
 *
 * // Update internship status
 * PATCH /api/internships/:id/status
 * {
 *   "status": "Closed"
 * }
 *
 * // Toggle urgent status
 * PATCH /api/internships/:id/urgent
 *
 * // Toggle isActive status
 * PATCH /api/internships/:id/toggle
 *
 * // Delete an internship
 * DELETE /api/internships/:id
 *
 * // Get internship by ID
 * GET /api/internships/:id
 */

// Sample internship data based on the new model structure
export const sampleInternshipData = {
  title: 'Software Engineering Intern',
  domain: 'Tech',
  company: 'TeachAdvise',
  location: 'Remote / On-site',
  duration: [45, 90, 180], // Array of days: 45 days, 90 days, 180 days
  salary: 'Unpaid Internship',
  deadline: '2025-08-01',
  status: 'Open',
  urgent: false,
  description: 'Develop cutting-edge educational technology solutions. Work with modern tech stack including React, Node.js, and cloud platforms. Contribute to products used by thousands of students.',
  requirements: [
    'JavaScript/React knowledge',
    'Problem-solving skills',
    'Git experience',
    'Computer Science background'
  ],
  benefits: [
    'Latest tech tools',
    'Code review mentorship',
    'Portfolio projects',
    'Competitive salary'
  ],
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5-Qh3IjNY8rPqWM82aUPb1ga5SkXoIpRmI23Mz9Tj-KoUo67ZaZL_HqJRUR4alNyfxKGKS7q48eluFiK_c6khL8_5qH4AST78W8ZQxR0YF0M9i9pUnL7CpbjHFnsE9b6Q-qxkwjArR8pida1mkbEzz3Od6xHkMFJkhPe0y0JebtzG9TecwsUjH-oJ3WrnRLs_sIfGDa-yw3LBAgXRGaWs6yjERRXVANhDZ449JGm3WG0wFtDzwi9GcOrLQ3jJXjZ0x3N6_7G5D87A',
  isActive: true
};

// Additional sample internships
export const additionalSampleInternships = [
  {
    title: 'Marketing Intern',
    domain: 'Marketing',
    company: 'TechAdvise',
    location: 'Hybrid',
    duration: [60, 120],
    salary: '$15/hour',
    deadline: '2025-07-15',
    status: 'Open',
    urgent: true,
    description: 'Join our marketing team to help promote educational technology solutions. Work on social media campaigns, content creation, and market research.',
    requirements: [
      'Marketing or Communications major',
      'Social media experience',
      'Creative thinking',
      'Strong communication skills'
    ],
    benefits: [
      'Professional development',
      'Networking opportunities',
      'Flexible schedule',
      'Performance bonuses'
    ],
    image: 'https://example.com/marketing-intern.jpg',
    isActive: true
  },
  {
    title: 'Data Science Intern',
    domain: 'Data Science',
    company: 'TechAdvise',
    location: 'Remote',
    duration: [90, 180],
    salary: '$20/hour',
    deadline: '2025-06-30',
    status: 'Open',
    urgent: false,
    description: 'Work with large datasets to analyze student learning patterns and improve educational outcomes. Use machine learning to develop predictive models.',
    requirements: [
      'Python programming skills',
      'Statistics knowledge',
      'Machine learning basics',
      'Data visualization experience'
    ],
    benefits: [
      'Real-world data projects',
      'Mentorship from experts',
      'Publication opportunities',
      'Competitive compensation'
    ],
    image: 'https://example.com/data-science-intern.jpg',
    isActive: true
  }
];

// Example API usage:
/*
// Create a new internship
POST /api/internships
{
  "title": "Software Engineering Intern",
  "domain": "Tech",
  "company": "TeachAdvise",
  "location": "Remote / On-site",
  "duration": [45, 90, 180],
  "salary": "Unpaid Internship",
  "deadline": "2025-08-01",
  "status": "Open",
  "urgent": false,
  "description": "Develop cutting-edge educational technology solutions...",
  "requirements": ["JavaScript/React knowledge", "Problem-solving skills", "Git experience", "Computer Science background"],
  "benefits": ["Latest tech tools", "Code review mentorship", "Portfolio projects", "Competitive salary"],
  "image": "https://example.com/internship-image.jpg"
}

// Get all active internships
GET /api/internships/active

// Get internships by domain
GET /api/internships/domain/Tech

// Get urgent internships
GET /api/internships/urgent

// Update internship status
PATCH /api/internships/:id/status
{
  "status": "Closed"
}

// Toggle urgent status
PATCH /api/internships/:id/urgent
*/ 