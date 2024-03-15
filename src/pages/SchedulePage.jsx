import '../style/SchedulePage.css';// WeeklyTimesheet.jsx
import React, { useState } from 'react';

function SchedulePage() {
  // Sample timesheet data
  const [timesheetData, setTimesheetData] = useState([
    { day: 'Monday', hoursWorked: 8 },
    { day: 'Tuesday', hoursWorked: 7 },
    { day: 'Wednesday', hoursWorked: 7.5 },
    { day: 'Thursday', hoursWorked: 8 },
    { day: 'Friday', hoursWorked: 7 },
    // Add more days as needed
  ]);

  const handleHoursChange = (index, hours) => {
    const updatedTimesheetData = [...timesheetData];
    updatedTimesheetData[index].hoursWorked = hours;
    setTimesheetData(updatedTimesheetData);
  };

  const getTotalHoursWorked = () => {
    return timesheetData.reduce((total, entry) => total + parseFloat(entry.hoursWorked || 0), 0);
  };

  return (
    <div className='table-container'>
    <table className='table'>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hours Worked</th>
        </tr>
      </thead>
      <tbody>
        {timesheetData.map((entry, index) => (
          <tr key={index}>
            <td>{entry.day}</td>
            <td>
              <input
                type="number"
                value={entry.hoursWorked}
                onChange={(e) => handleHoursChange(index, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{getTotalHoursWorked()}</td>
        </tr>
      </tfoot>
    </table>
    </div>
  );
}

export default SchedulePage;
