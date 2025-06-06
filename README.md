# RAD Frontend Documentation


# git clone repo_url 
# cd repo
# npm install





## 1. Common Authentication & Profile

### 1.1 Login Page
* **Location (frontend):** `/login` [cite: 4]
* **UI Components:**
    * Email input (with user icon) [cite: 4]
    * Password input (with lock icon + toggle show/hide) [cite: 4]
    * Role dropdown (Patient, Doctor, Admin, Super Admin) [cite: 4]
    * "Access Medical Portal" button [cite: 4]
    * "Forgot password?" link [cite: 5]
    * "Request clinical access" link for new patients [cite: 5]

### 1.2 Role Selection
* **Dropdown Options:** [cite: 5]
    * PATIENT [cite: 5]
    * DOCTOR [cite: 5]
    * ADMIN [cite: 5]
    * SUPER ADMIN [cite: 5]
* **Purpose:** Drive role-based routing after successful login. [cite: 5]

### 1.3 Login Form Submission
* **User Action:** Fill in email, password, select role, click "Access Medical Portal" [cite: 6]
* **Validation:**
    * Email must be a valid email address [cite: 6]
    * Password at least 8 characters [cite: 6]
* **Post-Login Routing:** [cite: 7]
    * "PATIENT": `/dashboard` [cite: 7]
    * "DOCTOR": `/doctor-dashboard` [cite: 7]
    * "ADMIN": `/admin-dashboard` [cite: 7]
    * "SUPER ADMIN": `/superadmin-dashboard` [cite: 7]

### 1.4 Forgot Password
* **Location:** `/forgot-password` [cite: 7]
* **UI Components:**
    * Email input [cite: 7]
    * "Submit" button [cite: 7]

### 1.5 Request Access (Patient Registration)
* **Location:** `/request-access` [cite: 8]
* **UI Components:**
    * First name, Last name [cite: 8]
    * Gender dropdown [cite: 8]
    * Email, Phone [cite: 8]
    * Password, Confirm Password [cite: 8]
    * "Request clinical access" button [cite: 8]

### 1.6 Profile View & Edit (All Roles)
* **Location:** `/profile` [cite: 10]
* **UI Components:**
    * Avatar (with "Change Avatar" button) [cite: 10]
    * First Name, Last Name, Email (disabled), Phone [cite: 10]
    * Role badge (display only) [cite: 10]
    * "Save Changes" / "Cancel" buttons [cite: 10]
    * Change Password section (Old, New, Confirm inputs + toggle show/hide + Save Password button) [cite: 10]

## 2. Doctor (Radiologist) Interface

* **Base Route:** `/doctor` (or `/radiologist`) [cite: 12]

### 2.1 Dashboard Overview
* **Location:** `/doctor/dashboard` [cite: 12]
* **UI Components:**
    * Sidebar (collapsible) with navigation links: [cite: 12]
        * Dashboard (overview) [cite: 12]
        * Upload X-Ray [cite: 12]
        * Case History [cite: 12]
        * Generate Reports [cite: 12]
        * Messages [cite: 12]
        * Settings [cite: 12]
        * Profile [cite: 12]
    * **Header:** [cite: 12]
        * Hamburger icon (toggle sidebar) [cite: 12]
        * Breadcrumb: "Dashboard → Overview" [cite: 12]
    * **Metrics Section:** 4 cards showing: [cite: 12]
        * Pending Analysis [cite: 12]
        * Completed Reports [cite: 13]
        * Uploads Today [cite: 15]
        * Average Processing Time [cite: 16]
    * **Recent Activity Section:** [cite: 17]
        * List of latest actions: [cite: 17]
            * New chest X-ray uploaded [cite: 17]
            * Report generated [cite: 17]
            * Critical case flagged [cite: 17]
    * **Monthly Analysis Chart:** Placeholder for a chart (uses `<DashboardChart />` component) [cite: 17]

### 2.2 Upload X-Ray Page
* **Location:** `/doctor/upload-xray` [cite: 18]
* **UI Components:**
    * Breadcrumb: "Dashboard → Upload X-Ray" [cite: 18]
    * Drag-and-drop Area (or "Select Files" button) [cite: 18]
    * **Instructions:** [cite: 18]
        * "Select DICOM/JPEG files or drag & drop here" [cite: 18]
        * Multiple File Selection allowed [cite: 18]
        * Accepted Types: `image/`, `.dcm` [cite: 18]
    * **Selected Files List (if any):** Displays file name, size (MB), and a "Remove" (x) icon [cite: 18]
    * **Data Type (frontend state):** `type UploadedFile { name: string; size: number; id: string}` [cite: 19]
    * **Actions:** [cite: 19]
        * "Cancel" button clears selection [cite: 19]
        * "Start Analysis" button triggers backend analysis [cite: 19]

### 2.3 Case History Page
* **Location:** `/doctor/history` [cite: 20]
* **UI Components:**
    * Breadcrumb: "Dashboard → Case History" [cite: 20]
    * **List of Past Cases (timeline-style):** [cite: 20]
        * For each item: Date, Patient ID, Filename, Status icon (Completed, Pending, Critical), Diagnosis [cite: 20]
    * **Actions (buttons):** [cite: 20]
        * "View Details" (navigates to detail page) [cite: 20]
        * "Download" (PDF) [cite: 20]
    * **Statistics Section:** ("Monthly Trends" chart placeholder) [cite: 21]

### 2.4 Generated Reports Page
* **Location:** `/doctor/generate-reports` [cite: 23]
* **UI Components:**
    * Breadcrumb: "Dashboard → Generated Reports" [cite: 23]
    * **List of Generated Reports:** [cite: 23]
        * For each report: Report ID, Content preview (first few lines) [cite: 23]
        * **Actions:** [cite: 23]
            * "Download" (PDF) [cite: 23]
            * "Flag for Review" (marks as needing follow-up) [cite: 24]
    * Pagination (if many reports) [cite: 24]

### 2.5 Messaging Page
* **Location:** `/doctor/messages` [cite: 25]
* **UI Components:**
    * Breadcrumb: "Dashboard → Messages" [cite: 25]
    * **Conversations List (left column):** [cite: 25]
        * Search input (filter by patient name) [cite: 25]
        * For each conversation: Patient ID, Name, Last Message snippet, Timestamp, Unread badge (if any), Avatar (or initials), Online status indicator [cite: 25]
        * Selecting a conversation loads chat window. [cite: 26]
    * **Chat Window (right column):** [cite: 26]
        * Header: Patient avatar + Name + Patient ID [cite: 26]
        * Message history (scrollable): Patient messages, Doctor messages, Timestamps [cite: 27]
        * Message input at bottom: Text input + Send button [cite: 27]

### 2.6 Assigned Patients (CRUD)
* **Location:** `/doctor/assigned-patients` [cite: 29]
* **UI Components:**
    * Breadcrumb: “Dashboard → Assigned Patients” [cite: 29]
    * **Table of Assigned Patients:** [cite: 29]
        * Columns: Checkbox (select multiple), Patient Name, Patient ID, Specialty (if any), Assigned Date, Actions (Assign/Unassign/Details) [cite: 29]
    * **Actions:** [cite: 30]
        * Assign Patient button opens a modal to select from unassigned list. [cite: 30]
        * Unassign Patient for selected rows. [cite: 30]
        * View Patient Details (navigates to patient’s profile) [cite: 30]

## 3. Patient Interface

* **Base Route:** `/dashboard` [cite: 33]

### 3.1 Dashboard Overview
* **Location:** `/dashboard` [cite: 33]
* **UI Components:**
    * Sidebar (toggleable) with links: [cite: 33]
        * Dashboard (overview) [cite: 33]
        * Appointments [cite: 33]
        * Reports [cite: 33]
        * Messages [cite: 33]
        * Settings [cite: 33]
        * Profile [cite: 33]
    * **Header:** [cite: 33]
        * Hamburger icon (toggle sidebar) [cite: 33]
        * Breadcrumb: “Dashboard → Overview” [cite: 33]
    * **Metrics Section (3 cards):** [cite: 33]
        * Reports [cite: 33]
        * Appointments [cite: 34]
        * Upcoming Visits [cite: 34]
    * **Recent Activity Section:** [cite: 34]
        * List (e.g.): “Report ‘Chest X-Ray’ uploaded”, “Appointment scheduled with Dr. Mensah”, “Profile updated” [cite: 34]
    * **Dashboard Chart Section:** Placeholder (e.g., `<DashboardChart />`) [cite: 34]

### 3.2 Appointments Page
* **Location:** `/dashboard/patient-appointments` [cite: 34]
* **UI Components:**
    * Breadcrumb: “Dashboard → Appointments” [cite: 35]
    * “Appointment Management” Title [cite: 35]
    * Search Input (filter by doctor name or type) [cite: 35]
    * Status Filter Dropdown (“All”, “Confirmed”, “Pending”, “Completed”, “Cancelled”) [cite: 35]
    * “New Appointment” Button (opens modal or navigates to scheduling form) [cite: 35]
    * **List of AppointmentCards (each expandable):** [cite: 35]
        * Doctor name, Status badge, Date & time, Type, Duration [cite: 35]
        * On expand: shows location, notes, and “Add to Calendar” / “Get Directions” buttons [cite: 35]
    * **Empty State:** [cite: 35]
        * Shows icon + message “No appointments found matching your criteria” [cite: 35]
        * Buttons “Clear filters” and “Schedule New Appointment” [cite: 35]

### 3.3 My Reports Page
* **Location:** `/dashboard/patient-reports` [cite: 39]
* **UI Components:**
    * Breadcrumb: “Dashboard → Medical Reports” [cite: 39]
    * Search Input (filter by title or description) [cite: 39]
    * Status Filter Dropdown (“All”, “Reviewed”, “Pending”, “Critical”) [cite: 39]
    * **List of ReportCards (each expandable):** [cite: 39]
        * Title, Status badge, Description snippet, Date [cite: 39]
        * On expand: show detailed findings, “Download Report” buttons for attachments [cite: 39]
    * **Empty State:** [cite: 39]
        * Icon + message “No reports found matching your criteria” [cite: 39]
        * “Clear filters” button [cite: 39]

### 3.4 Patient Messaging Page
* **Location:** `/dashboard/patient-messages` [cite: 41]
* **UI Components:**
    * Breadcrumb: “Dashboard → Messages” [cite: 41]
    * **Doctor Info Header:** [cite: 41]
        * Avatar + Name + Specialty [cite: 41]
    * **Chat Window:** [cite: 41]
        * Scrollable list of messages: Patient messages, Doctor messages, Timestamps [cite: 41]
    * **Message Input:** [cite: 41]
        * Text input + Send button [cite: 41]

### 3.5 Patient Settings Page
* **Location:** `/dashboard/settings` [cite: 42]
* **UI Components:**
    * Breadcrumb: “Dashboard → Settings” [cite: 42]
    * **Account Settings Section:** [cite: 42]
        * Language dropdown (English, French, Spanish, etc.) [cite: 42]
        * Timezone dropdown [cite: 42]
    * **Notification Preferences:** [cite: 42]
        * Appointment Reminders toggle [cite: 42]
        * Test Results toggle (default: on) [cite: 42]
        * Health Tips toggle [cite: 42]
    * **Privacy & Security:** [cite: 42]
        * Data Sharing toggle [cite: 42]
        * Two-Factor Authentication badge/status + “Enable” (modal or link) [cite: 43]
        * “Download Medical Data” button [cite: 43]
    * **Save/Cancel Buttons:** [cite: 43]
        * Save: sends all updated settings payloads in one PUT or multiple requests as above. [cite: 44]

### 3.6 Patient Profile Page
* **Location:** `/dashboard/profile` [cite: 44]
* **UI Components:**
    * Breadcrumb: “Dashboard → Profile” [cite: 44]
    * Avatar & Change Avatar [cite: 44]
    * **Personal Info:** [cite: 45]
        * First Name, Last Name, Email (disabled), Phone [cite: 45]
        * Role badge (“Patient”) [cite: 45]
        * “Save Changes” / “Cancel” buttons [cite: 45]
    * **Change Password Section:** Old, New, Confirm inputs + toggles + “Save Password” [cite: 45]

## 4. Admin Interface

* **Base Route:** `/admin` [cite: 45]

### 4.1 Dashboard Overview
* **Location:** `/admin/dashboard` [cite: 45]
* **UI Components:**
    * Sidebar (toggleable) with links: [cite: 45]
        * Dashboard [cite: 45]
        * Manage Doctors [cite: 45]
        * Manage Patients [cite: 46]
        * Doctor-Patient Assignments [cite: 46]
        * Activity Log [cite: 46]
        * Settings [cite: 46]
        * Reports [cite: 46]
        * Profile [cite: 46]
    * **Header:** [cite: 46]
        * Hamburger icon [cite: 46]
        * Breadcrumb: “Dashboard → Overview” [cite: 46]
    * **Metrics Section (4 cards):** [cite: 46]
        * Number of Doctors [cite: 46]
        * Number of Patients [cite: 46]
        * Uploads Today [cite: 46]
        * Avg Processing Time [cite: 46]
    * **Analysis Overview Chart:** Placeholder (e.g., `<DoctorPatientChart />`) [cite: 47]

### 4.2 Manage Doctors Page
* **Location:** `/admin/manage-doctors` [cite: 47]
* **UI Components:**
    * Breadcrumb: “Dashboard → Doctors Management” [cite: 47]
    * **“Add Doctor” / “Bulk Upload” Tabs:** [cite: 47]
        * **Tab 1: Add Doctor:** [cite: 47]
            * Form fields: First Name, Last Name, Email, Phone, Specialization, Qualifications, Years of Experience, Bio [cite: 47]
            * Submit: “Add Doctor” button [cite: 48]
        * **Tab 2: Bulk Upload:** [cite: 48]
            * Drag-and-drop or “Select CSV File” button [cite: 48]
    * **Doctors Table:** [cite: 48]
        * Columns (sortable & scrollable if wide): First Name (sticky left), Last Name (sticky), Email, Phone, Specialization, Qualifications, Years of Experience, Actions (Edit, Delete) [cite: 48, 49]

### 4.3 Manage Patients Page
* **Location:** `/admin/manage-patients` [cite: 49]
* **UI Components:**
    * Breadcrumb: “Dashboard → Patients Management” [cite: 49]
    * **“Add Patient” / “Bulk Upload” Tabs (similar to Manage Doctors):** [cite: 49]
        * **Tab 1: Add Patient:** Fields: First Name, Last Name, Email, Phone, Gender, DOB, Address, Insurance Details [cite: 50]
        * **Tab 2: Bulk Upload (CSV):** [cite: 50]
    * **Patients Table:** [cite: 50]
        * Columns: First Name, Last Name, Email, Phone, Gender, DOB, Actions (Edit, Delete) [cite: 50]

### 4.4 Doctor-Patient Assignments Page
* **Location:** `/admin/assignments` [cite: 51]
* **UI Components:**
    * Breadcrumb: “Dashboard → Doctor-Patient Assignments” [cite: 51]
    * Filter by Doctor Name (search input) [cite: 51]
    * Column Visibility Dropdown (toggle which columns to show/hide) [cite: 51]
    * **Table of DoctorAssignment:** [cite: 51]
        * Columns: Checkbox (select multiple), Doctor Name (sortable), Specialty, Assigned Patients Count (sortable), Actions (Assign Patient, Unassign Patient(s), “Copy Doctor ID”, “View Doctor Details”) [cite: 52]
    * Pagination Controls (Next/Previous) [cite: 52]
    * Filtering & Column Visibility Controls (via dropdown) [cite: 52]

### 4.5 Activity Log Page
* **Location:** `/admin/activity-log` [cite: 54]
* **UI Components:**
    * Breadcrumb: “Dashboard → Activity Log” [cite: 54]
    * Header: Title “System Activity Log” + “Export CSV” button [cite: 54]
    * **Filters Section:** [cite: 54]
        * Date Range Pickers (Start Date, End Date) [cite: 54]
        * Action Type Dropdown (All, LOGIN, USER UPDATE, PATIENT UPDATE, etc.) [cite: 54]
        * Search Input (filter by description, user name, or IP) [cite: 55]
        * Loading Spinner (while fetching) [cite: 55]
    * **Activity Table:** [cite: 55]
        * Columns: Timestamp (sortable), User (sortable), Role (Admin, Doctor, Patient, Superadmin), Action Type (sortable), Description, IP Address [cite: 55]
        * **Actions:** [cite: 55]
            * View Details (opens a modal or displays more info) [cite: 55]
            * Delete Record (danger action) [cite: 55]
        * Each row background alternates colors. [cite: 55]
    * Pagination Controls: Previous/Next [cite: 55]

### 4.6 Admin Settings Page
* **Location:** `/admin/settings` [cite: 57]
* **UI Components:**
    * Breadcrumb: “Dashboard → Settings” [cite: 57]
    * **Account Settings:** [cite: 57]
        * Language dropdown [cite: 57]
        * Timezone dropdown [cite: 58]
    * **Notification Preferences:** [cite: 58]
        * New User Registration toggle [cite: 58]
        * System Alert Emails toggle [cite: 58]
    * **Security & Privacy:** [cite: 58]
        * Data Sharing toggle [cite: 58]
        * Two-Factor Authentication toggle for Admins [cite: 58]
    * **Download System Logs:** Button to download audit logs (filtered by date or type if implemented) [cite: 59]

### 4.7 Admin Reports Page
* **Location:** `/admin/reports` [cite: 59]
* **UI Components:**
    * Breadcrumb: “Dashboard → Reports” [cite: 59]
    * **Tenant Usage Report Section:** [cite: 59]
        * Date picker [cite: 59]
        * “Generate CSV” button [cite: 59]
    * **License & Subscription Report Section:** [cite: 59]
        * “Download PDF” button (licenses) [cite: 59]
        * “Download CSV” button (subscriptions) [cite: 59]
    * **Audit Summary Report Section:** [cite: 59]
        * Date range pickers [cite: 59]
        * “Download CSV” button [cite: 59]

### 4.8 Admin Profile Page
* **Location:** `/admin/profile` [cite: 60]
* **UI Components:**
    * Breadcrumb: “Dashboard → Profile” [cite: 60]
    * Avatar & Change Avatar [cite: 60]
    * **Personal Info:** [cite: 60]
        * First Name, Last Name, Email (disabled), Phone, Role badge (“Admin”) [cite: 60]
        * “Save Changes” / “Cancel” buttons [cite: 60]
    * **Change Password:** Old, New, Confirm inputs + toggles + “Save Password” [cite: 60]

## 5. SuperAdmin Interface

* **Base Route:** `/superadmin` [cite: 60]

### 5.1 Dashboard Overview
* **Location:** `/superadmin/dashboard` [cite: 60]
* **UI Components:**
    * Sidebar (toggleable) with links: [cite: 60]
        * Dashboard [cite: 60]
        * Manage Admins [cite: 61]
        * Activity Log [cite: 61]
        * Settings [cite: 61]
        * Reports [cite: 61]
        * Profile [cite: 61]
    * **Header:** [cite: 61]
        * Hamburger icon [cite: 61]
        * Breadcrumb: “SuperAdmin → Dashboard” [cite: 61]
    * **Quick Stats Section (4 cards):** [cite: 61]
        * Total Admins [cite: 61]
        * Total Doctors [cite: 61]
        * Audit Events [cite: 61]
        * Active Alerts [cite: 62]
    * **Charts Section (grid grid-cols-1 lg:grid-cols-5):** [cite: 62]
        * User Growth Trend (spans 3 columns): Line chart showing monthly user registrations (Doctors, Patients, Admins) [cite: 62]
        * System Resources (spans 2 columns): Vertical bar chart showing CPU, Memory, Storage usage (%) [cite: 62]
    * **Recent Activities & System Status (grid grid-cols-1 lg:grid-cols-3):** [cite: 62]
        * Recent Activities (spans 2 columns): List of activities with icon by type (admin/system/security), description, timestamp [cite: 63]
        * System Status (single column): List of components (Main Database, Background Jobs, Tenant Services, etc.) with “Operational” or other status badges [cite: 63]

### 5.2 Manage Admins Page
* **Location:** `/superadmin/manage-admins` [cite: 64]
* **UI Components:**
    * Breadcrumb: “SuperAdmin → Admins Management” [cite: 64]
    * “Add Admin” Button (opens modal for new admin details) [cite: 65]
    * **Admins Table (similar to Doctors/Patients table for Admin):** [cite: 65]
        * Columns: Name, Email, Role, Last Login, Status (Active/Inactive), Actions (Edit, Deactivate/Activate, Delete) [cite: 65]
        * Filter by Status dropdown [cite: 65]
        * Search by Name/Email [cite: 65]
        * Pagination [cite: 65]

### 5.3 Activity Log Page
* **Location:** `/superadmin/activity-log` [cite: 69]
* **UI Components:**
    * Breadcrumb: “SuperAdmin → Activity Log” [cite: 69]
    * Title “Global System Activity Log” + “Export All” button [cite: 69]
    * Filters: Date Range, User Role, Action Type, Search (by description/IP) [cite: 69]
    * Activity Table: Columns: Timestamp, User, Role, Action Type, Description, IP, Location [cite: 69]
    * Pagination [cite: 69]

### 5.4 Settings Page
* **Location:** `/superadmin/settings` [cite: 69]
* **UI Components:**
    * Breadcrumb: “SuperAdmin → Settings” [cite: 70]
    * **Global System Configuration:** [cite: 70]
        * Maintenance Mode toggle (with message input) [cite: 70]
        * Max Upload Size (input, e.g., 50MB) [cite: 70]
        * Data Retention Policy (dropdown/input, e.g., 3 years) [cite: 70]
    * **Integration Settings:** [cite: 71]
        * External API Keys (text input, e.g., for reporting tools) [cite: 71]
        * SMS Gateway Configuration (fields for API key, sender ID) [cite: 71]
    * **Security Policies:** [cite: 71]
        * Password Policy (min length, complexity requirements) [cite: 71]
        * Session Timeout (minutes) [cite: 71]
    * “Save All” button [cite: 71]

### 5.5 Reports Page
* **Location:** `/superadmin/reports` [cite: 72]
* **UI Components:**
    * Breadcrumb: “SuperAdmin → Reports” [cite: 73]
    * **Overall System Usage Report:** [cite: 73]
        * Generates a report on total users, uploads, and system activity over time. [cite: 73]
        * “Generate Report” button (opens modal with options or directly downloads) [cite: 74]
    * **Error and Performance Logs:** [cite: 75]
        * Search filters for severity, date, service. [cite: 75]
        * “Download Logs” button [cite: 75]
    * **User Activity Breakdown:** [cite: 75]
        * Shows activity by role (Doctors, Patients, Admins) [cite: 75]
        * “Generate CSV” button [cite: 75]

### 5.6 Profile Page
* **Location:** `/superadmin/profile` [cite: 76]
* **UI Components:**
    * Breadcrumb: “SuperAdmin → Profile” [cite: 76]
    * Same components and functionality as Admin Profile Page: [cite: 76]
        * Avatar Change Avatar [cite: 76]
        * Personal Info (First Name, Last Name, Email (disabled), Phone, Role badge “Super Admin”) [cite: 76]
        * Change Password Section [cite: 76]