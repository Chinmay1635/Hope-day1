'use client';
import React, { useEffect, useState } from 'react';



function LiveTitle() {
 
    interface OfflineIssue {
        _id: string;
        sender: string;
        receiver: string;
        content: string;
        timestamp: string;
    }

    const [offlineIssues, setOfflineIssues] = useState<OfflineIssue[]>([]);

const handleOfflineIssue = () => {
  fetch('/api/getSMS')
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      return response.json();
    })
    .then((data) => {
      setOfflineIssues(data); // or data.issues depending on FastAPI
    })
    .catch((error) => {
      console.error('Error fetching offline issues:', error);
    });
};

useEffect(() => {
  handleOfflineIssue();
}, []);

  return (
    <div className="flex flex-col items-center justify-between gap-3">
       {offlineIssues.length === 0 ? (
    <p className="text-gray-500">No offline issues found.</p>
  ) : (
    offlineIssues.map((issue) => (
      <div
        key={issue._id}
        className="p-4 rounded-lg border border-gray-300 shadow-sm bg-white"
      >
        <p><strong>Receiver:</strong> {issue.sender}</p>
        <p><strong>Sender:</strong> {issue.receiver}</p>
        <p><strong>Message:</strong> {issue.content}</p>
        <p><strong>Timestamp:</strong> {new Date(issue.timestamp).toLocaleString()}</p>
      </div>
    ))
  )}
    </div>
  );
}

export default LiveTitle;
