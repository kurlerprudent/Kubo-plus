// components/RecentActivity.tsx
import { motion } from 'framer-motion';
import { Bell, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export const RecentActivity = ({ 
  activities, 
  isLoading 
}: { 
  activities: any[]; 
  isLoading: boolean 
}) => {
  const handleView = (id: number) => {
    console.log(`View activity ${id}`);
    // Implement view logic
  };

  const handleDelete = (id: number) => {
    console.log(`Delete activity ${id}`);
    // Implement delete logic
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="bg-gray-200 rounded-full h-10 w-10 animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.length > 0 ? activities.map((activity, i) => (
        <motion.div 
          key={activity.id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <Bell className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900">{activity.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(activity.timestamp), 'MMM d, yyyy - h:mm a')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleView(activity.id)}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(activity.id)}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )) : (
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
};