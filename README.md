# Multi-Step Contact Form

A comprehensive, accessible multi-step contact form built with Remix, TypeScript, and Shopify Polaris. This form provides a smooth user experience with client-side validation, progress tracking, and responsive design.

## 🚀 Features

- **6-Step Progressive Form**: Personal Info → Contact Details → Company Info → Project Details → Preferences → Review
- **Real-time Validation**: Client-side and server-side validation with detailed error messages
- **Progress Tracking**: Visual progress bar and step badges
- **Responsive Design**: Mobile-friendly interface using Shopify Polaris
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: Screen reader support and keyboard navigation
- **State Management**: Efficient form state handling with React hooks
- **Server-Side Rendering**: Built with Remix for optimal performance

## 🛠️ Tech Stack

- **Framework**: [Remix](https://remix.run/)
- **UI Library**: [Shopify Polaris](https://polaris.shopify.com/)
- **Language**: TypeScript
- **Styling**: Polaris Design System
- **Validation**: Custom validation utilities
- **State Management**: React hooks (useState)

## 📋 Form Steps

1. **Personal Information** - Name, date of birth, gender, title
2. **Contact Details** - Email, phone, address, time zone preferences
3. **Company Information** - Company name, job title, industry details (optional)
4. **Project Details** - Inquiry type, project scope, timeline, budget
5. **Communication Preferences** - Newsletter, frequency, language, accessibility
6. **Review & Submit** - Final review of all entered information

## 🏗️ Project Structure

```
app/
├── components/contact/
│   ├── steps/
│   │   ├── personal-info.tsx
│   │   ├── contact-details.tsx  
│   │   ├── company-info.tsx
│   │   ├── project-details.tsx
│   │   ├── preferences.tsx
│   │   ├── review.tsx
│   │   └── index.ts
│   ├── action-buttons.tsx
│   └── submit-feedback.tsx
├── utils/
│   ├── validation.ts
│   └── step-config.ts
├── types/
│   └── index.ts
└── routes/
    └── contact.tsx
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js v20.x
- npm or yarn package manager

1. **Clone the repository**
```bash
git clone <repository-url>
cd contact-form
```

2. **Check Node version**
```bash
node --version
# Should be v20.x or higher
```

3. **Install dependencies**
```bash
npm install
# or
yarn install
```

4. **Environment Setup**
```bash
cp .env.example .env
# Configure your environment variables
```

5. **Start development server**
```bash
npm run dev
# or
yarn dev
```

## 💻 Key Components

### Form Validation
- **Email validation** with confirmation matching
- **Phone number formatting** and validation
- **Required field validation** with custom error messages
- **Date validation** with age restrictions
- **URL validation** for websites and LinkedIn profiles

### State Management
```typescript
// Centralized form data structure
interface TCompleteFormData {
  personalInfo: TPersonalInfo;
  contactDetails: TContactDetails;
  companyInfo: TCompanyInfo;
  projectDetails: TProjectDetails;
  preferences: TPreferences;
}
```

### Navigation System
- **Server-side routing** with URL step parameters
- **Form submission handling** for navigation
- **Progress calculation** and step validation
- **Previous/Next button logic** with validation checks

## 🎯 Form Features

### Accessibility
- WCAG 2.1 compliant design
- Screen reader optimization
- Keyboard navigation support
- High contrast mode option
- Large font size option

### User Experience
- **Auto-save functionality** (maintains state across steps)
- **Validation feedback** with specific error messages
- **Progress indication** with completion percentage
- **Step badges** showing current position and completion
- **Responsive design** for mobile and desktop

### Data Handling
- **Type-safe form parsing** from FormData
- **Structured data validation** at each step
- **Error state management** with detailed feedback
- **Final review step** before submission

## 🔍 Validation Rules

| Field | Validation |
|-------|------------|
| Name | 2-50 characters, letters/spaces/hyphens only |
| Email | Valid format + confirmation match |
| Phone | International format support |
| Age | Minimum 13 years old |
| URLs | Valid HTTP/HTTPS format |
| Required Fields | Non-empty validation |

## 🚀 Deployment

The application is built for deployment on platforms supporting Remix:

1. **Build the application**
```bash
npm run build
```

2. **Deploy to your platform**
- Vercel
- Netlify
- Railway
- Or any Node.js hosting service

## 📝 API Endpoints

### `POST /contact`
Handles form submission with the following actions:
- `previous` - Navigate to previous step
- `next` - Validate current step and proceed
- `submit` - Final form submission

### Response Format
```typescript
interface ActionData {
  currentStep?: EFormStep;
  errors?: ValidationErrors;
  success?: boolean;
  message?: string;
}
```

## 🔄 Form Flow

1. User enters information on current step
2. Clicks "Continue" to trigger validation
3. If valid, redirects to next step with updated URL
4. If invalid, displays errors and remains on current step
5. Final step shows review of all data
6. Submit button processes complete form

## 🧪 Testing Considerations

- Form validation across all steps
- Navigation between steps
- Error handling and display
- Accessibility compliance
- Mobile responsiveness
- Data persistence during navigation

## 🔒 Security Features

- Server-side validation on all inputs
- XSS protection through proper data handling
- CSRF protection via Remix's built-in features
- Input sanitization and validation

## 📊 Performance

- Server-side rendering for fast initial load
- Minimal client-side JavaScript
- Optimized bundle size with tree shaking
- Progressive enhancement approach
