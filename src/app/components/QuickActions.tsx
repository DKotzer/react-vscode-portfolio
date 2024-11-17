import React from 'react';
import { Box, Typography } from '@mui/material';
import { QuickAction } from '../styles/ChatStyles';

interface QuickActionsProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {actions.map((action, index) => (
        <QuickAction
          key={index}
          onClick={() => onActionClick(action)}
        >
          <Typography variant="body2" sx={{ fontSize: '13px' }}>
            {action}
          </Typography>
        </QuickAction>
      ))}
    </Box>
  );
};

export default QuickActions;
