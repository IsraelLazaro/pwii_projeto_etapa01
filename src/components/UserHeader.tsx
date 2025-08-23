import React from 'react';
import { Pencil } from 'lucide-react';
import './UserHeader.css';
//import { ThemedText } from './ThemedText';

type UserHeaderProps = {
  userName: string;
  avatarUrl?: string;
};

export const UserHeader: React.FC<UserHeaderProps> = ({ userName, avatarUrl }) => {
  return (
    <div className="user-header">
      <div className="avatar-wrapper">
        <img src={avatarUrl} alt={userName} />
        <span className="edit-icon">
          <Pencil size={25} color="#652efa"/>
        </span>
      </div>      
        <span className="user-name">{userName}</span>
    </div>
  );
};
