import React from 'react';
import { Pencil } from 'lucide-react';
import './UserHeader.css';

type UserHeaderProps = {
  userName: string;
  avatarUrl?: string;
  showEditIcon?: boolean;  
  onEditClick?: () => void;
  onClick?: () => void; // ← Adicione esta linha
};

export const UserHeader: React.FC<UserHeaderProps> = ({ 
  userName, 
  avatarUrl, 
  showEditIcon = true, 
  onEditClick,
  onClick // ← Adicione esta linha
}) => {
  return (
    <div 
      className="user-header" 
      onClick={onClick} // ← Adicione onClick aqui
      style={{ cursor: onClick ? 'pointer' : 'default' }} // ← Opcional: muda cursor
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