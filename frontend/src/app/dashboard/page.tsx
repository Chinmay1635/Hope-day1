 
import LiveTitle from '@/components/LiveTitle';
import RealtimeList from '@/components/RealtimeList';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import DecodeImage from '../../components/decodeImage';
import { Button } from '@mui/material';

async function Page() {
  const user = await currentUser();

  if (!user?.publicMetadata.isAdmin) {
    return <div>Not authorized</div>;
  }

  return (
    <div className=" flex flex-col justify-center mx-auto max-w-5xl w-full p-4">
     
      <LiveTitle />
      <RealtimeList />
      {/* <DecodeImage />  */}
    </div>
  );
}

export default Page;
