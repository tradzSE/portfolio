export const currentProject = {
  name: 'SEED-TRACK',
  role: 'Project Lead',
  client: 'PhilRice Genebank',
  status: 'In Development',
  about: [
    'SEED-TRACK is a web-based Seed Inventory and Storage Management System developed for the PhilRice Genebank.',
    'The system is designed to improve seed inventory, storage, request processing, and traceability by replacing parts of the existing manual workflow with a centralized digital platform.',
  ],
  roleDescription: 'As Project Lead, I coordinate the development of SEED-TRACK from requirements and planning through implementation and testing.',
  responsibilities: [
    'Coordinating the development team',
    'Communicating with the client',
    'Gathering and refining system requirements',
    'Managing the product backlog and sprint priorities',
    'Monitoring development progress',
    'Reviewing system features and workflows',
    'Helping define the system architecture and database requirements',
    'Coordinating testing and documentation',
    'Ensuring development aligns with client requirements',
  ],
  features: [
    'Seed inventory management',
    'Seed packet tracking',
    'Barcode and QR code scanning',
    'Rack and tray storage monitoring',
    'Seed request processing',
    'Inventory transaction tracking',
    'Role-based access control',
    'Reports and monitoring',
    'AI Seed Assistant',
  ],
  technology: {
    Frontend: ['React'],
    Backend: ['Node.js', 'GraphQL'],
    Database: ['MySQL'],
    Platform: ['Web Application'],
  },
  statusDetails: [
    'Currently in active development.',
    'The team is continuing development, testing, documentation, and refinement based on requirements and feedback from the PhilRice Genebank.',
  ],
  author: 'Ranier Teraldico',
  title: 'Project Lead / Software Engineer',
}

const section = (title, content) => `${title}\n${'-'.repeat(title.length)}\n\n${content}`
const bullets = (items) => items.map((item) => `- ${item}`).join('\n')
const paragraphs = (items) => items.join('\n\n')
const technology = (groups) => Object.entries(groups)
  .map(([label, items]) => `${label}:\n${items.join('\n')}`)
  .join('\n\n')

export function formatCurrentProject(project = currentProject) {
  return `CURRENT PROJECT
===============

Project: ${project.name}
Role: ${project.role}
Client: ${project.client}
Status: ${project.status}

${section('ABOUT', paragraphs(project.about))}

${section('MY ROLE', `${project.roleDescription}\n\nMy responsibilities include:\n\n${bullets(project.responsibilities)}`)}

${section('KEY FEATURES', bullets(project.features))}

${section('TECHNOLOGY', technology(project.technology))}

${section('PROJECT STATUS', paragraphs(project.statusDetails))}

------------------------------------------------------------

${project.author}
${project.title}`
}
