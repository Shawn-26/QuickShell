import React from 'react';
import './Card.css';
import { AlertCircle, Circle, MoreHorizontal, User } from 'react-feather';

const Card = ({ ticket, user, grouping, showCheckbox }) => {
  const { id, title, priority, assignedUser } = ticket;

  return (
    <div className="card">
      <div className="card-header">
        {grouping === 'status' && user && <img src={user.profilePicture} alt="Profile" />}
      </div>
      <div className="card-content">
        <div className="ticket-info">
          <p className="ticket-id">{id}</p>
          <User />
        </div>
          <h4>{grouping === 'user' ? `${user.name}'s Tickets` : title}</h4>
        {grouping === 'status' && user && (
          <p>
            <span className="icon">&#x1F464;</span> Assigned to: {user.name}
          </p>
        )}
        {grouping === 'priority' && (
          <p>
            <span className="icon">&#x1F4A5;</span> Priority: {getPriorityTitle(priority)}
            <span><MoreHorizontal/></span>
          </p>
        )}
        {grouping !== 'user' && (
          <div className="feature-request-box">
            <AlertCircle />
            <p className="feature-request-text">
              <span className="icon"><Circle/></span> Feature Request
            </p>
          </div>
        )}
        {showCheckbox && <input type="checkbox" className="card-checkbox" />}
      </div>
    </div>
  );
};

const getPriorityTitle = (priority) => {
  switch (priority) {
    case '4':
      return 'Urgent';
    case '3':
      return 'High';
    case '2':
      return 'Medium';
    case '1':
      return 'Low';
    case '0':
      return 'No priority';
    default:
      return 'Unknown Priority';
  }
};

export default Card;
