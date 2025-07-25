# 🚀 Backend API Integration

This project has been updated to integrate with the tested backend API as documented in `API_TESTING_DOCUMENTATION.md`.

## ✅ **What's Implemented**

### 🔐 **Authentication System**
- **Patient Registration**: `POST /api/auth/patients/register`
- **User Login**: `POST /api/auth/login` (with role-based routing)
- **Forgot Password**: `POST /api/auth/forgot-password`
- **User Logout**: `POST /api/auth/logout`

### 👤 **User Management**
- **Get Profile**: `GET /api/users/me`
- **Update Profile**: `PUT /api/users/me`
- **Change Password**: `POST /api/users/change-password`
- **Upload Avatar**: `POST /api/users/me/avatar`

### 🩺 **Doctor Dashboard** (Role-based)
- **Metrics Overview**: `GET /api/doctor/metrics/overview`
- **Pending Analysis**: `GET /api/doctor/metrics/pending-analysis`
- **Completed Reports**: `GET /api/doctor/metrics/completed-reports`
- **Today's Uploads**: `GET /api/doctor/metrics/uploads-today`
- **Avg Processing Time**: `GET /api/doctor/metrics/avg-processing-time`
- **Monthly Analysis**: `GET /api/doctor/metrics/monthly-analysis`
- **Recent Activity**: `GET /api/doctor/activity/recent`
- **Upload X-ray**: `POST /api/doctor/upload`
- **Start Analysis**: `POST /api/doctor/analyze`
- **Analysis Status**: `GET /api/doctor/analyze/status`

## 📂 **File Structure**

```
src/
├── types/
│   └── api.ts                 # All API types matching backend
├── lib/
│   └── api.ts                 # API utility functions
├── hooks/
│   └── useAuth.ts             # Authentication hook
├── contexts/
│   └── AuthContext.tsx        # Auth context provider
├── components/
│   ├── loginForm.tsx          # Updated login form
│   └── ApiTestComponent.tsx   # API testing component
└── constants/
    └── index.ts               # API endpoints
```

## 🛠️ **Usage Examples**

### **Login with Real API**
```typescript
import { loginUser } from '@/lib/api';

const handleLogin = async (email: string, password: string, role: UserRole) => {
  try {
    const response = await loginUser({ email, password, role });
    // Token is automatically stored
    // User is redirected based on their role
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### **Use Authentication Hook**
```typescript
import { useAuthContext } from '@/contexts/AuthContext';

function MyComponent() {
  const { isAuthenticated, user, hasRole, logout } = useAuthContext();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
      {hasRole('DOCTOR') && <DoctorDashboard />}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### **Protect Routes by Role**
```typescript
import { withAuth } from '@/contexts/AuthContext';

// Only allow doctors and admins
const ProtectedComponent = withAuth(MyComponent, ['DOCTOR', 'ADMIN']);
```

### **Call API Functions**
```typescript
import { getUserProfile, changePassword, getDoctorMetricsOverview } from '@/lib/api';

// Get user profile
const profile = await getUserProfile();

// Change password
await changePassword({
  currentPassword: 'old123',
  newPassword: 'new456'
});

// Get doctor metrics (requires DOCTOR role)
const metrics = await getDoctorMetricsOverview();
```

## 🔧 **Environment Setup**

Copy `.env.example` to `.env.local` and configure:

```bash
# Backend API (your tested backend)
NEXT_PUBLIC_API_URL=http://localhost:3000

# MongoDB (as documented)
MONGO_URI=mongodb+srv://obed:password123..@rad-database.anvltcw.mongodb.net/...
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🎯 **Key Features**

### ✅ **Type Safety**
- All API types match your tested backend
- Proper TypeScript interfaces for requests/responses
- Role-based type checking

### ✅ **Authentication**
- JWT token management
- Automatic token storage/retrieval
- Role-based route protection
- Proper logout with token cleanup

### ✅ **Error Handling**
- Consistent error responses
- Toast notifications for user feedback
- Proper error boundary handling

### ✅ **Role Management**
- Support for PATIENT, DOCTOR, ADMIN, SUPER_ADMIN
- Role-based component rendering
- Route protection by role

### ✅ **Real Backend Integration**
- Connects to your tested API endpoints
- Matches documented request/response formats
- Handles authentication headers properly

## 🚀 **Next Steps**

1. **Start your backend server** on `http://localhost:3000`
2. **Update environment variables** with your actual values
3. **Wrap your app** with `AuthProvider`
4. **Update existing components** to use the new API functions
5. **Test the integration** using the `ApiTestComponent`

## 📝 **Notes**

- All API calls match the tested documentation exactly
- Frontend role values (`"patient"`) are mapped to backend values (`"PATIENT"`)
- JWT tokens are stored in localStorage and included in API requests
- Patient registration requires approval (as documented)
- Doctor registration endpoint is missing (noted in documentation)

The integration is complete and ready to connect to your tested backend! 🎉
