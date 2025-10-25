# AssetFlow - Enterprise Asset Management System

A modern, fully responsive, and enterprise-grade Asset Management System built with Next.js, React, and Tailwind CSS.

## Features

### Authentication & Security
- Role-based login (Admin, Engineer, Viewer)
- Secure session management
- Password change functionality
- Security information dashboard

### Dashboard
- Real-time asset metrics (Total, Active, Assigned, Unassigned)
- Interactive charts:
  - Asset utilization trends (Line chart)
  - Asset type distribution (Pie chart)
  - Assets per department (Bar chart)
- Quick action buttons

### Assets Management
- Comprehensive data table with 9 columns
- Search and filter functionality
- Add/Edit/Delete assets with validation
- CSV export capability
- Status indicators (Active/Inactive)

### Users Management
- User directory with role-based display
- Add/Edit/Delete users
- Track assigned assets per user
- Last login information
- CSV export functionality

### Reports & Analytics
- Asset health distribution analysis
- Utilization and efficiency trends
- Asset allocation trends
- Department-wise allocation breakdown
- Detailed asset status summary table
- PDF and CSV export options

### Settings & Profile
- **Profile Management**: Update personal information
- **Security**: Change password with validation
- **Appearance**: Theme selection (Light/Dark/Auto) and accent color customization
- **Notifications**: Email and report preferences

### Design Features
- Dark/Light mode toggle with system preference detection
- Responsive design (Mobile, Tablet, Desktop)
- Modern UI with smooth animations
- Professional color palette (Blue-Gray with Teal accents)
- Semantic design tokens for consistent theming
- Accessible components with proper ARIA labels

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Semantic Design Tokens
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Inter (body), Poppins (headings)

## Project Structure

\`\`\`
app/
├── layout.tsx                 # Root layout with fonts
├── globals.css               # Global styles and design tokens
├── page.tsx                  # Login page
├── dashboard/
│   └── page.tsx             # Dashboard page
├── assets/
│   └── page.tsx             # Assets management page
├── users/
│   └── page.tsx             # Users management page
├── reports/
│   └── page.tsx             # Reports & analytics page
└── settings/
    └── page.tsx             # Settings page

components/
├── auth/
│   └── login-form.tsx       # Login form component
├── layout/
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── navbar.tsx           # Top navigation bar
│   └── protected-layout.tsx # Protected route wrapper
├── dashboard/
│   ├── dashboard-content.tsx
│   ├── stat-card.tsx
│   └── chart-card.tsx
├── assets/
│   ├── assets-content.tsx
│   ├── assets-table.tsx
│   └── add-asset-modal.tsx
├── users/
│   ├── users-content.tsx
│   ├── users-table.tsx
│   └── add-user-modal.tsx
├── reports/
│   └── reports-content.tsx
└── settings/
    ├── settings-content.tsx
    ├── profile-settings.tsx
    ├── security-settings.tsx
    ├── appearance-settings.tsx
    └── notification-settings.tsx
\`\`\`

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

- **Email**: demo@company.com
- **Password**: demo123
- **Roles**: Admin, Engineer, Viewer

## Key Components

### Authentication
- Login page with role-based access control
- Session management using localStorage
- Protected routes with automatic redirection

### Data Management
- Mock data for assets and users
- CRUD operations with form validation
- Search and filter functionality
- CSV export capabilities

### Theming
- Semantic design tokens in globals.css
- Dark/Light mode with system preference detection
- Customizable accent colors
- Smooth theme transitions

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Collapsible sidebar for mobile
- Optimized table layouts

## Customization

### Colors
Edit the design tokens in `app/globals.css`:
- Primary colors: Blue-Gray palette
- Accent colors: Teal (customizable)
- Neutral colors: Gray scale
- Status colors: Success, Warning, Error, Info

### Fonts
Modify fonts in `app/layout.tsx`:
- Body: Inter
- Headings: Poppins

### Data
Replace mock data in component files with API calls to your backend.

## Features for Portfolio

This project demonstrates:
- Modern Next.js architecture with App Router
- React hooks and state management
- Responsive design with Tailwind CSS
- Data visualization with Recharts
- Form handling and validation
- Authentication flow
- Dark/Light mode implementation
- Professional UI/UX design
- Modular component structure
- TypeScript for type safety

## Future Enhancements

- Backend API integration
- Real-time data updates with WebSockets
- Advanced filtering and sorting
- Asset history and audit logs
- Multi-language support
- Two-factor authentication
- Role-based access control (RBAC)
- Activity logging
- Bulk operations
- Advanced reporting

## License

This project is open source and available for portfolio use.
