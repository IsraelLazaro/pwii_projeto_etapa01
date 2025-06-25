import React from 'react';
import './UserHeader.css';

type UserHeaderProps = {
  username: string;
  avatarUrl: string;
};

export const UserHeader: React.FC<UserHeaderProps> = ({ username, avatarUrl }) => {
  return (
    <div className="user-header">
      <img src={avatarUrl} alt={username} />
      <span>{username}</span>
    </div>
  );
};