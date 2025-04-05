'use client';
import React from 'react';
import { Player } from '@lordicon/react';

import ICON from '../assets/liveicon.json';
import { Button } from './ui/button';
import Link from 'next/link';

function LiveTitle() {
  const playerRef = React.useRef<Player>(null);
  const handleOfflineIssue = () => {

  }
  React.useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <div className="flex items-center justify-between gap-3">
      <div className='flex items-center gap-2'>
      <h1 className="font-bold text-xl tracking-wide">Live Updates</h1>
      <div className="mt-2">
        <Player
          ref={playerRef}
          icon={ICON}
          onComplete={() => playerRef.current?.playFromBeginning()}
        />
      </div>
      </div>
      <Link href="/offlineIssue"><Button className=''>View Offline Issues</Button></Link>
    </div>
  );
}

export default LiveTitle;
