import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getGroupsByTeacherId/660cd023188073f19a417fca');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Group List</h2>
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