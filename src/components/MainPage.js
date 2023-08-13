import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './MainPage.css';
import { MoreHorizontal } from 'react-feather';

const MainPage = ({ grouping, ordering, showCheckbox }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios
      .get('https://apimocha.com/quicksell/data')
      .then((response) => {
        setTickets(response.data.tickets);
        const usersData = response.data.users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const sortAndGroupTickets = (tickets, grouping, ordering) => {
    const sortedTickets = tickets.slice().sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      } else if (ordering === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    let groupedTickets = {};
    if (grouping === 'status') {
      groupedTickets = sortedTickets.reduce((acc, ticket) => {
        const status = ticket.status;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groupedTickets = sortedTickets.reduce((acc, ticket) => {
        const user = ticket.userId;
        const userDetail = users[user];
        if (userDetail) {
          if (!acc[user]) {
            acc[user] = {
              name: userDetail.name,
              tickets: [],
            };
          }
          acc[user].tickets.push(ticket);
        }
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      groupedTickets = sortedTickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        if (!acc[priority]) {
          acc[priority] = [];
        }
        acc[priority].push(ticket);
        return acc;
      }, {});
    }

    const sections = Object.keys(groupedTickets).map((key) => ({
      title: grouping === 'priority' ? getPriorityTitle(key) : key,
      tickets: grouping === 'user' ? groupedTickets[key].tickets : groupedTickets[key],
    }));

    return sections;
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

  const sortedAndGroupedTickets = sortAndGroupTickets(tickets, grouping, ordering);

  return (
    <main>
      <div className="horizontal-sections">
        {sortedAndGroupedTickets.map((section, index) => (
          <div key={index} className="section-container">
            <h2 className="section-title">
              {grouping === 'user' ? users[section.title].name : section.title}
              {grouping === 'user' && '👤'} {/* User icon */}
              {grouping === 'status' && '🚀'} {/* Status icon */}
              {grouping === 'priority' && '📌'} {/* Priority icon */}
            </h2>
            <div className="card-list">
              {section.tickets.map((ticket, index) => (
                <Card
                  key={index}
                  ticket={ticket}
                  user={users[ticket.userId]}
                  showCheckbox={showCheckbox}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainPage;
