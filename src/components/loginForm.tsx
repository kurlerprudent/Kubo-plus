import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Existing login logic remains unchanged
      console.log('Login data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Hero Panel - Simplified */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-8 
                      bg-gradient-to-br from-blue-800 to-cyan-700
                      text-white">
        <div className="max-w-md">
          <div className="bg-cyan-600/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <MedicalIcon className="h-6 w-6 text-cyan-300" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Secure Medical Portal
          </h1>
          <p className="text-base opacity-90">
            Access patient records securely with Google's healthcare compliance
          </p>
        </div>
        <div className="flex space-x-4">
          <LockIcon className="h-5 w-5 text-cyan-300" />
          <ShieldIcon className="h-5 w-5 text-cyan-300" />
          <span className="text-sm opacity-75">HIPAA Compliant</span>
        </div>
      </div>

      {/* Right Panel - Decluttered */}
      <div className="w-full lg:w-1/2 bg-slate-50 dark:bg-slate-900
                      flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg
                          p-6 transition-all">
            {/* Card Header - Centered */}
            <div className="text-center mb-6">
              <div className="mx-auto bg-cyan-100 dark:bg-cyan-900/30 rounded-full w-16 h-16 flex items-center justify-center">
                <MedicalIcon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold mt-4 dark:text-white">
                Access Medical Portal
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Access Type Select - Simplified */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">
                  Access Type
                </label>
                <select 
                  className={`w-full p-3 rounded-lg border ${
                    errors.accessType 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-cyan-500'
                  } bg-white dark:bg-slate-700/50 dark:text-white focus:outline-none focus:ring-1`}
                  {...register('accessType', { required: 'Please select access type' })}
                >
                  <option value="">Select role</option>
                  <option value="doctor">Medical Provider</option>
                  <option value="admin">Administrator</option>
                  <option value="researcher">Research Specialist</option>
                </select>
                {errors.accessType && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.accessType.message as string}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full p-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-cyan-500'
                  } bg-white dark:bg-slate-700/50 dark:text-white focus:outline-none focus:ring-1`}
                  placeholder="you@medical.org"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium dark:text-slate-300">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  className={`w-full p-3 rounded-lg border ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-cyan-500'
                  } bg-white dark:bg-slate-700/50 dark:text-white focus:outline-none focus:ring-1`}
                  placeholder="••••••••"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400
                          text-white py-3 rounded-lg font-medium transition-colors
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Access Medical Portal"
                )}
              </button>
            </form>

            {/* Secondary Links */}
            <div className="mt-6 text-center space-y-3">
              <a href="#" className="text-cyan-600 hover:text-cyan-700 text-sm underline transition-colors dark:text-cyan-400 dark:hover:text-cyan-300">
                Forgot password?
              </a>
              <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>
              <a href="#" className="text-cyan-600 hover:text-cyan-700 text-sm underline transition-colors dark:text-cyan-400 dark:hover:text-cyan-300">
                Request clinical access
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Google Medical. All rights reserved.</p>
            <div className="mt-1 flex justify-center space-x-4">
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Terms</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock icon components - replace with actual implementations
function MedicalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm2-4v2H6v-2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/>
      <circle cx="18" cy="11.5" r="1"/>
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  );
}