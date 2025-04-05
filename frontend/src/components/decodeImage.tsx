'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';

function DecodeImage() {
  const [decodedText, setDecodedText] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/decode`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      setDecodedText(result.decoded_text); // Update the state with the decoded text
    } catch (error) {
      console.error('Error uploading image:', error);
      setDecodedText('Error decoding the image.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
         <Button
                onClick={() => window.open('https://twitter.com/search?q=%23hope_sixth_sense_d821', '_blank')}
                
                color="primary"
              >
                Search On Twitter
              </Button>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          className="border-2 border-gray-300 rounded-lg p-2"
        />
        <Button
          className="bg-blue-500 text-white rounded-lg p-2"
          onClick={async (e) => {
            e.preventDefault();
            const fileInput = e.currentTarget.previousElementSibling as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
              await uploadImage(file);
            }
          }}
        >
          Decode Image
        </Button>
      </div>

      {/* Display decoded text */}
      {decodedText && (
        <div className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-100">
          <strong>Decoded Text:</strong> {decodedText}
        </div>
      )}
    </div>
  );
}

export default DecodeImage;
