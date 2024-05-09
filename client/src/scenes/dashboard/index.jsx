import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const userId = Cookies.get('id');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getGroupsByTeacherId/${userId}`);
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h2>User ID: {userId}</h2>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            {group.name} - {group._id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;