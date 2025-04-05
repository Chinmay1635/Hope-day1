 
import LiveTitle from '@/components/LiveTitle';
import RealtimeList from '@/components/RealtimeList';
import { currentUser } from '@clerk/nextjs/server';
import React, { useEffect } from 'react';
import GetSMS from '../../components/GetSMS';


async function Page() {
  const user = await currentUser();

  if (!user?.publicMetadata.isAdmin) {
    return <div>Not authorized</div>;
  }
  
  return (
    <div className=" flex flex-col justify-center mx-auto max-w-5xl w-full p-4">
     
      Offline Queries
      <GetSMS />
    </div>
  );
}

export default Page;
