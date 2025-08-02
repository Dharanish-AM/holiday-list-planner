# 🎄 Holiday List Planner

A modern, responsive web application for managing and exploring public holidays. Built with Next.js 15, React 19, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup**: JWT-based authentication with bcrypt password hashing
- **Protected Admin Routes**: Authentication guard for admin panel access
- **Token Verification**: Automatic token validation and refresh
- **User Session Management**: Persistent login state with localStorage
- **Logout Functionality**: Secure logout with session cleanup

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Glass Morphism**: Beautiful backdrop blur effects and modern styling
- **Smooth Animations**: Custom CSS animations for enhanced user experience
- **Gradient Text**: Eye-catching gradient text effects
- **Hover Effects**: Interactive hover animations and transitions

### 📅 Smart Calendar
- **Interactive Calendar**: Click on dates to filter holidays
- **Holiday Highlights**: Visual indicators for dates with holidays
- **Real-time Filtering**: Dynamic filtering based on calendar selection

### 🔍 Advanced Search & Filtering
- **Multi-field Search**: Search by title, description, or region
- **Type Filtering**: Filter by National, Festival, Optional, Religious, or Regional
- **Region Filtering**: Filter holidays by specific regions
- **Real-time Results**: Instant search results as you type

### 📊 Statistics Dashboard
- **Total Holidays**: Count of all holidays in the system
- **Upcoming Holidays**: Number of future holidays
- **This Month**: Holidays occurring in the current month
- **Visual Stats**: Beautiful stat cards with color-coded information

### 🎯 Upcoming Holidays Widget
- **Top 5 Upcoming**: Shows the next 5 upcoming holidays
- **Quick Access**: Easy navigation to important dates
- **Visual Ranking**: Numbered list with holiday details

### ⚙️ Admin Panel Features
- **Add/Edit/Delete**: Full CRUD operations for holidays
- **Form Validation**: Client-side validation for required fields
- **Confirmation Dialogs**: Safe delete operations with confirmation
- **Search & Filter**: Admin-specific search and filtering
- **Bulk Operations**: Easy management of multiple holidays
- **Authentication Required**: Secure access with login verification

### 🎨 Design System
- **Consistent Styling**: Unified design language across all pages
- **Color-coded Types**: Different colors for different holiday types
- **Modern Cards**: Beautiful card layouts with hover effects
- **Typography**: Clean, readable fonts with proper hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (for data storage)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd holiday-list-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
cp .env.local.example .env.local

# Add your JWT secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here
```

4. Set up your MongoDB connection in `src/lib/db.js`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages

### 🏠 Home Page (`/`)
- Landing page with feature overview
- Navigation to other sections
- Modern hero section with call-to-action buttons
- Feature highlights and statistics

### 👥 User Page (`/user`)
- Interactive calendar with holiday highlights
- Advanced search and filtering options
- Upcoming holidays widget
- Beautiful holiday cards with detailed information
- Real-time statistics dashboard

### 🔐 Authentication Pages
- **Login Page** (`/admin/auth/login`): Secure login with email/password
- **Signup Page** (`/admin/auth/signup`): User registration with validation
- **Protected Routes**: Automatic redirect to login if not authenticated

### ⚙️ Admin Page (`/admin`)
- **Authentication Required**: Must be logged in to access
- Add new holidays with form validation
- Edit existing holidays
- Delete holidays with confirmation dialogs
- Search and filter holiday list
- Statistics overview
- User session management

## 🔐 Authentication Flow

### Login Process
1. User visits `/admin/auth/login`
2. Enters email and password
3. System validates credentials against database
4. JWT token generated and stored in localStorage
5. User redirected to admin panel

### Signup Process
1. User visits `/admin/auth/signup`
2. Enters name, email, and password
3. Password validation (minimum 6 characters)
4. Email uniqueness check
5. Password hashed with bcrypt
6. User account created and JWT token generated
7. User redirected to admin panel

### Protected Routes
- Admin panel requires authentication
- Automatic token verification on page load
- Redirect to login if token invalid/expired
- Secure logout with session cleanup

## 🎨 UI Components

### Navigation Component
- Responsive navigation bar
- Mobile hamburger menu
- Consistent branding
- Smooth transitions
- Authentication-aware links

### AuthGuard Component
- Protects admin routes
- Token verification
- Loading states
- Automatic redirects

### Card Components
- Modern card designs
- Hover animations
- Color-coded holiday types
- Responsive layouts

### Form Components
- Modern input styling
- Focus effects
- Validation feedback
- Consistent spacing

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Calendar**: React Calendar
- **Animations**: Custom CSS animations
- **Icons**: Emoji icons for simplicity

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Token Verification**: Automatic validation on protected routes
- **Session Management**: Secure localStorage handling
- **Input Validation**: Client and server-side validation
- **Protected API Routes**: Authentication middleware

## 🎯 Key Improvements

### Performance
- Optimized loading states
- Efficient filtering algorithms
- Responsive image handling
- Smooth animations

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Consistent design language
- Mobile-first approach
- Seamless authentication flow

### Accessibility
- Proper focus management
- Screen reader friendly
- Keyboard navigation
- High contrast ratios

## 🚀 Future Enhancements

- [ ] Dark mode support
- [ ] Export functionality (PDF, CSV)
- [ ] Calendar view modes (month, year, list)
- [ ] Holiday reminders
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Role-based access control
- [ ] API rate limiting

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Tailwind CSS
