# Frontend Test Accounts

## ✅ Patient Accounts Created

### Patient 1: Emma Wilson
- **Email**: `emma.wilson@testfrontend.com`
- **Password**: `EmmaTest123!`
- **Role**: `PATIENT`
- **Name**: Emma Wilson
- **Gender**: Female
- **Phone**: +1555000001
- **Status**: Pending Approval ⏳

### Patient 2: Michael Davis
- **Email**: `michael.davis@testfrontend.com`
- **Password**: `MikeTest123!`
- **Role**: `PATIENT`
- **Name**: Michael Davis
- **Gender**: Male
- **Phone**: +1555000002
- **Status**: Pending Approval ⏳

## ✅ Doctor Accounts Created

### Doctor 1: Dr. Sarah Johnson
- **Email**: `dr.sarah.johnson@testfrontend.com`
- **Password**: `DrSarahTest123!`
- **Role**: `DOCTOR`
- **Name**: Dr. Sarah Johnson
- **Phone**: +1555000003
- **Specialization**: Radiology
- **Years of Experience**: 5
- **License Number**: RAD12345
- **Status**: Pending Approval ⏳

### Doctor 2: Dr. Robert Chen
- **Email**: `dr.robert.chen@testfrontend.com`
- **Password**: `DrRobertTest123!`
- **Role**: `DOCTOR`
- **Name**: Dr. Robert Chen
- **Phone**: +1555000004
- **Specialization**: Orthopedics
- **Years of Experience**: 8
- **License Number**: ORTH98765
- **Status**: Pending Approval ⏳

## 📋 Next Steps

1. **For Frontend Integration** - Use all 4 accounts for comprehensive testing
2. **Account Approval** - All accounts are in "pending" status and may need approval for full access

## 🔧 Database Models Found

The system uses these models for user management:
- **Auth Model**: Handles email, password, role, status
- **User Model**: Handles firstName, lastName, phone, profile data  
- **Patient Model**: Inherits from User, adds patient-specific fields
- **Doctor Model**: Inherits from User, adds specialization, experience, qualifications

## 🎯 Working Features for Frontend

### ✅ Authentication Endpoints Ready
- `POST /api/auth/login` - Login with email/password/role
- `POST /api/auth/logout` - Logout with JWT token
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/patients/register` - Patient registration
- `POST /api/auth/doctors/register` - Doctor registration ✨ NEW!

### ✅ Patient Dashboard Routes Available
- `GET /api/v1/patient/metrics/dashboard-overview`
- `GET /api/v1/patient/appointments`
- `POST /api/v1/patient/appointments`
- `GET /api/v1/patient/reports`

### ✅ Doctor Dashboard Routes Available
- `GET /api/doctor/metrics/overview`
- `GET /api/doctor/metrics/pending-analysis`
- `POST /api/doctor/upload`
- `POST /api/doctor/analyze`

## 🚀 Frontend Integration Commands

### Login Patient (Emma)
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'emma.wilson@testfrontend.com',
    password: 'EmmaTest123!',
    role: 'PATIENT'
  })
})
```

### Login Patient (Michael)
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'michael.davis@testfrontend.com',
    password: 'MikeTest123!',
    role: 'PATIENT'
  })
})
```

### Login Doctor (Dr. Sarah)
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'dr.sarah.johnson@testfrontend.com',
    password: 'DrSarahTest123!',
    role: 'DOCTOR'
  })
})
```

### Login Doctor (Dr. Robert)
```javascript
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'dr.robert.chen@testfrontend.com',
    password: 'DrRobertTest123!',
    role: 'DOCTOR'
  })
})
```

---

**Created**: July 25, 2025  
**Status**: All test accounts ready ✅  
**Backend Status**: Running error-free on http://localhost:3000  
**Doctor Registration**: ✅ IMPLEMENTED AND TESTED
