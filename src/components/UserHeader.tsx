import React from 'react';
import { Pencil } from 'lucide-react';
import './UserHeader.css';

type UserHeaderProps = {
  userName: string;
  avatarUrl?: string;
  showEditIcon?: boolean;  
  onEditClick?: () => void;
  onClick?: () => void; 
};

export const UserHeader: React.FC<UserHeaderProps> = ({ 
  userName, 
  avatarUrl, 
  showEditIcon = true, 
  onEditClick,
  onClick 
}) => {
  return (
    <div 
      className="user-header" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }} 
    >
      <div className="avatar-wrapper">
        <img src={avatarUrl} alt={userName} />
        {showEditIcon && ( 
          <span 
            className="edit-icon"  
            onClick={(e) => {
              e.stopPropagation(); 
              onEditClick?.();
            }}
          >
            <Pencil size={25} color="#652efa" />
          </span>
        )}
      </div>
      <span className="user-name">{userName}</span>
    </div>
  );
};