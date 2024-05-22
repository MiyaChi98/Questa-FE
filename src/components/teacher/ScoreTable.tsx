// src/ScoreTable.js
import React from 'react';

const ScoreTable = () => {
  const data = {
    aboveFive: 100,
    avgScore: 8.88888888888889,
    belowOrEqualFive: 0,
    numberofSubmit: 1,
  };

  const tableData = [
    { title: 'Bài nộp', value: data.numberofSubmit },
    { title: 'Điểm trung bình', value: data.avgScore.toFixed(2) },
    { title: 'Phần trăm >5', value:  `${data.aboveFive}%` },
    { title: 'Phần trăm <5', value:  `${data.belowOrEqualFive}%` },
  ];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-[20px] border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tiêu đề
            </th>
            <th scope="col" className="px-6 py-3">
              Thông số
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {row.title}
              </th>
              <td className="px-6 py-4 text-navy-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
