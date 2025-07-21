
import { motion } from 'framer-motion';

export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  isLoading 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  isLoading: boolean 
}) => (
  <motion.div 
    className="bg-white shadow p-6 rounded-xl flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>
    </div>
    {isLoading ? (
      <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
    ) : (
      <span className="text-3xl font-bold text-gray-900">
        {value}
      </span>
    )}
  </motion.div>
);