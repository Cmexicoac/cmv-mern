import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getTeacher');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const findGroupById = (teacher, groupId) => {
    return teacher.groups.find(group => group._id === groupId);
  };

  const displayGroup = (group) => {
    return group ? group.name : 'Group not found';
  };

  return (
    <div>
      <h2>Teacher List</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>
            {teacher.nombre} - {teacher.email} - {teacher.matricula}
            <ul>
              {teacher.groups && teacher.groups.map((group) => (
                <li key={group._id}>{displayGroup(findGroupById(teacher, group._id))}</li>
              ))}
            </ul>
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
