// components/Header.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, LogOut, User, Settings, HeartPulse, Home, SunIcon, MoonIcon } from 'lucide-react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useDarkMode } from '../hooks/useDarkMode';
import { format } from 'date-fns';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const DropdownItem = ({ Icon, label }: { Icon: any; label: string }) => (
    <li>
      <button className="flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </button>
    </li>
  );

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Profile menu"
      >
        <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 dark:bg-gray-700" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 dark:bg-gray-700" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            </div>
            <ul className="py-2">
              <DropdownItem Icon={User} label="My Profile" />
              <DropdownItem Icon={Settings} label="Account Settings" />
              <DropdownItem Icon={HeartPulse} label="Health Preferences" />
              <DropdownItem Icon={Home} label="Help Center" />
            </ul>
            <div className="py-2 border-t border-gray-200 dark:border-gray-700">
              <DropdownItem Icon={LogOut} label="Sign Out" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Header = ({ 
  isLoading, 
  patientName,
  onMenuClick 
}: { 
  isLoading: boolean; 
  patientName?: string;
  onMenuClick: () => void;
}) => {
  const currentTime = useCurrentTime();
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isLoading ? 'Welcome back!' : `Welcome back, ${patientName || 'Patient'}!`}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(currentTime, 'EEEE, MMMM d, yyyy h:mm a')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          
          <div className="relative">
            <button 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};