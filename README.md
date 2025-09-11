# Contact Form

A streamlined, accessible single-page contact form built with Remix, TypeScript, and Shopify Polaris. This form provides an optimal user experience with real-time validation, immediate feedback, and responsive design focused on conversion and usability.

## 🚀 Features

- **Single-Page Form**: Streamlined experience with essential fields only
- **Real-time Validation**: Client-side validation with instant feedback as you type
- **Live Error Handling**: Field-specific error messages with Remix server-side validation
- **Success Page Display**: Shows submitted data confirmation after successful submission
- **Responsive Design**: Mobile-first design using Shopify Polaris components
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Accessibility**: WCAG compliant with proper form labels and error associations
- **Progressive Enhancement**: Works without JavaScript, enhanced with client-side features
- **Server-Side Rendering**: Built with Remix for optimal performance and SEO

## 🛠️ Tech Stack

- **Framework**: [Remix](https://remix.run/) - Full-stack web framework
- **UI Library**: [Shopify Polaris](https://polaris.shopify.com/) - Design system
- **Language**: TypeScript - Type-safe development
- **Styling**: Polaris Design System - Consistent, accessible components
- **Validation**: Server-side validation with client-side enhancements
- **State Management**: React hooks (useState) for form state

## 📋 Form Fields

### Required Fields
- **First Name** - User's given name (2-50 characters)
- **Last Name** - User's family name (2-50 characters)
- **Email** - Valid email address with format validation
- **Subject** - Brief description of inquiry
- **Message** - Detailed message (minimum 10 characters)

### Optional Fields
- **Phone Number** - International format support
- **Newsletter Subscription** - Opt-in for updates

### Smart Features
- **Inquiry Type Selection** - Routes messages to appropriate teams:
  - General Inquiry
  - Product Support
  - Sales Question
  - Partnership
  - Technical Issue
  - Billing

## 🏗️ Project Structure

```
app/
├── routes/
│   ├── contact.tsx          # Main contact form component
│   └── _index.tsx          # Homepage with form overview
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js v18.x or higher
- npm or yarn package manager

1. **Clone the repository**
```bash
git clone <repository-url>
cd contact-form
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 💻 Key Components

### Form Validation
```typescript
// Server-side validation with detailed error handling
const validateForm = (data: ContactFormData): FieldErrors | null => {
  const errors: FieldErrors = {};
  
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  // ... additional validation rules
}
```

### Type-Safe Form Data
```typescript
type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  newsletter: boolean;
};
```

### Action Data Response
```typescript
type ActionData = {
  success?: boolean;
  message?: string;
  errors?: FieldErrors;
  submittedData?: ContactFormData;
};
```

## 🎯 Form Features

### User Experience
- **Character Counter** - Real-time message length display
- **Smart Placeholders** - Helpful input examples
- **Loading States** - Clear feedback during submission
- **Error Recovery** - Form data preserved during validation errors
- **Success Confirmation** - Detailed submission review page

### Accessibility
- **WCAG 2.1 Compliant** - Proper form structure and labels
- **Screen Reader Support** - Semantic HTML and ARIA labels
- **Keyboard Navigation** - Full keyboard accessibility
- **Required Field Indicators** - Clear visual and screen reader cues
- **Error Announcements** - Proper error associations

### Mobile Optimization
- **Responsive Layout** - Works on all device sizes
- **Touch-Friendly** - Optimized for mobile interactions
- **Fast Loading** - Minimal JavaScript bundle
- **Offline Resilience** - Progressive enhancement approach

## 🔍 Validation Rules

| Field | Validation Rules |
|-------|-----------------|
| **First Name** | Required, non-empty string |
| **Last Name** | Required, non-empty string |
| **Email** | Required, valid email format |
| **Phone** | Optional, international format validation |
| **Subject** | Required, non-empty string |
| **Message** | Required, minimum 10 characters |
| **Inquiry Type** | Pre-defined options selection |
| **Newsletter** | Boolean checkbox (optional) |

## 🚀 Form Flow

1. **User Input** - Fill out form with real-time validation feedback
2. **Client Validation** - Immediate field-level validation as user types
3. **Form Submission** - Server-side validation on submit
4. **Error Handling** - Display field-specific errors if validation fails
5. **Success Response** - Show confirmation page with submitted data
6. **Data Processing** - Log/store form data (customize for your needs)

## 📊 Success Page

After successful submission, users see:
- ✅ Success confirmation banner
- 📋 Complete review of submitted information
- 🔄 Option to submit another message
- 🏠 Navigation back to homepage

## 🔒 Security Features

- **Server-Side Validation** - All validation occurs on server
- **XSS Protection** - Proper data sanitization
- **CSRF Protection** - Remix built-in security features
- **Type Safety** - TypeScript prevents runtime errors
- **Input Sanitization** - Clean data handling

## 🧪 Testing Checklist

- [ ] Form submission with valid data
- [ ] Field-level validation errors
- [ ] Email format validation
- [ ] Phone number format validation
- [ ] Message length validation
- [ ] Required field validation
- [ ] Newsletter checkbox functionality
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Success page display
- [ ] Navigation between pages

## 📈 Performance Features

- **Server-Side Rendering** - Fast initial page load
- **Progressive Enhancement** - Works without JavaScript
- **Minimal Bundle Size** - Only essential client-side code
- **Optimized Images** - Efficient asset loading
- **Form State Management** - Efficient React state handling

## 🔄 Customization

### Adding New Fields
```typescript
// 1. Update the ContactFormData type
type ContactFormData = {
  // ... existing fields
  newField: string;
};

// 2. Add validation rule
if (!data.newField.trim()) errors.newField = "New field is required";

// 3. Add form field in component
<TextField
  label="New Field"
  name="newField"
  value={formData.newField}
  onChange={(value) => updateField("newField", value)}
  error={actionData?.errors?.newField}
  requiredIndicator
/>
```

### Customizing Inquiry Types
```typescript
const inquiryOptions = [
  { label: "Your Custom Option", value: "custom" },
  // ... other options
];
```

## 🚀 Deployment

The application is ready for deployment on any platform supporting Remix:

### Build Commands
```bash
npm run build    # Build for production
npm start       # Start production server
```

### Recommended Platforms
- **Vercel** - Zero-config deployment
- **Netlify** - JAMstack hosting
- **Railway** - Full-stack deployment
- **Fly.io** - Global edge deployment

## 📝 API Reference

### POST /contact

**Request Body (FormData):**
```
firstName: string (required)
lastName: string (required)
email: string (required)
phone: string (optional)
subject: string (required)
message: string (required)
inquiryType: string (required)
newsletter: "on" | undefined
```

**Success Response (200):**
```typescript
{
  success: true,
  message: string,
  submittedData: ContactFormData
}
```

**Error Response (400):**
```typescript
{
  errors: {
    [fieldName]: string
  }
}
```
