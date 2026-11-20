// Name shown on the phone screen, just above the number.
export const phoneCallerName = ' Nimesh';
// Number shown under it. (It used to be part of the photo; it is now live text.)
export const phoneNumberText = '+1 832-251-8076';

export const sections = {
about: {
  title: 'About Me',
  eyebrow: 'A little introduction',

  body: 'I’m a motivated and curious web developer who enjoys building clean, user-friendly websites. I’m eager to grow in a creative, collaborative environment, contribute to meaningful projects, and keep learning through real-world challenges and experienced teammates.',

  bullets: [
    'Interested in thoughtful, user-friendly web experiences',
    'Enjoy learning new tools and solving practical problems',
    'Bring a mix of web development, digital marketing, and customer-service experience'
  ],

  links: [
    {
      label: 'Download My Resume',
      href: '/media/resume.pdf',
      download: true
    }
  ]
},
  education: { title: 'Education', eyebrow: 'My learning journey', entries: [
    { place: 'Webster University', location: 'St. Louis, Missouri', role: 'MS in Information and Technology Management', date: 'Expected December 2026' },
    { place: 'Shanker Dev Campus', location: 'Kathmandu, Nepal', role: 'Bachelor’s in Information Management', date: 'December 2023', detail: 'Degree emphasis: Web Development and Marketing · GPA: 3.35/4.0' },
  ] },
  experience: { title: 'Experience', eyebrow: 'Where I’ve contributed', entries: [
    { place: 'Saket Textile Industries Pvt. Ltd.', location: 'Kathmandu, Nepal', role: 'Digital Marketing Officer', date: 'December 2024 – April 2025', points: ['Managed digital platforms and supported online systems.', 'Analyzed engagement data to improve performance.', 'Worked with internal teams across departments to coordinate and execute projects.'] },
    { place: 'Fatafat Sewa Pvt. Ltd.', location: 'Lalitpur, Nepal', role: 'Digital Marketing Intern', date: 'April 2023 – July 2023', points: ['Supported SEO through content development, backlink research, and website optimization.', 'Used Canva and Adobe Photoshop to create and modify web-based content.', 'Assisted with WordPress website updates and improvements to usability and user experience.'] },
    { place: 'Daraz Kaymu Pvt. Ltd.', location: 'Kathmandu, Nepal', role: 'Customer Service Representative Intern', date: 'October 2022 – February 2023', points: ['Resolved customer inquiries while maintaining high satisfaction.', 'Troubleshot issues and provided clear, step-by-step solutions.', 'Documented common problems to improve process efficiency.'] },
  ] },
  skills: { title: 'Skills', eyebrow: 'Tools and strengths', groups: [
    { label: 'Web development', values: 'ReactJS · Bootstrap · SASS/SCSS · PHP · MySQL · Git/GitHub' },
    { label: 'Creative and analytics tools', values: 'VS Code · Google Analytics · Canva · Adobe Photoshop' },
    { label: 'Productivity', values: 'Microsoft Word · PowerPoint · Excel' },
    { label: 'Languages', values: 'Nepali (Native) · English (Proficient) · Hindi (Conversational) · Spanish (Beginner)' },
  ] },
  projects: { title: 'Projects', eyebrow: 'Things I’ve built', entries: [
    { place: 'Inventory Management System', location: 'Web development project', role: 'Inventory management application', date: 'Project demo', points: ['A software project focused on managing inventory-related information and workflows.'], video: '/media/inventory-management-demo.mp4', videoNote: 'Place your original demo video at public/media/inventory-management-demo.mp4 to make it playable here.' },
    { place: 'Recipe Finder', location: 'Web application', role: 'Recipe search and browsing app', date: 'Live project', points: ['A web app for finding and exploring recipes, deployed on Vercel.'], images: [
      { src: '/media/recipe-finder-screenshot-1.png', alt: 'Recipe Finder home screen' },
      { src: '/media/recipe-finder-screenshot-2.png', alt: 'Recipe Finder search results' },
     ], links: [{ label: 'View live app', href: 'https://recipe-finder-polished.vercel.app/' }] },
    {
  place: 'Previous Portfolio Website',
  location: 'Personal portfolio website',
  role: 'Web design and development',
  date: 'Previous project',
  points: [
    'An earlier version of my personal portfolio, showcasing my web development journey, skills, and projects.'
  ],
  images: [
    {
      src: '/media/website-screenshot.png',
      alt: 'Screenshot of my previous portfolio website'
    }
  ],
  links: [
    {
      label: 'Visit Previous Website',
      href: 'https://donny007-debug.github.io/portfolio-website/'
    }
  ]
},
{ place: 'GitHub Projects', location: 'Code and experiments', role: 'Development work', date: 'Ongoing', points: ['Explore my repositories and development work.'], links: [{ label: 'Visit GitHub', href: 'https://github.com/Donny007-debug' }] },
  ] },
  hobbies: {
  title: 'Hobbies & Interests',
  eyebrow: 'Beyond the work',
  body: `There’s more to a person than a résumé.

⚽ Soccer
📚 Reading
🌳 Nature Walks
🎬 Movies
📺 TV Series`
},
contact: {
  title: 'Contact',
  eyebrow: 'Let’s connect',
  body: 'I’m open to connecting about web development, collaboration, and new opportunities.',
  phonePlaceholder: '+1 832-251-8076',

  links: [
    {
      label: 'Email',
      href: 'mailto:bajracharyanimesh2022@gmail.com'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nimesh-bajracharya/'
    }
  ],

  note: 'Feel free to reach out. I’d be happy to connect!'
},
};
