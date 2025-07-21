
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

const SecurityCard = ({ 
  icon, 
  title, 
  children 
}: { 
  icon: ReactNode; 
  title: string; 
  children: ReactNode;
}) => {
  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b dark:from-blue-900/30 dark:to-blue-800/30 dark:border-gray-700">
        <CardTitle className="flex items-center gap-3 text-blue-900 dark:text-blue-100">
          <span className="bg-blue-100 p-2 rounded-lg dark:bg-blue-900/50">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-gray-700 dark:text-gray-300">
        {children}
      </CardContent>
    </Card>
  );
};

export default SecurityCard;