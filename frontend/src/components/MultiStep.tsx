'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CheckCircleIcon } from 'lucide-react';

const steps = [
  'Fill out the form',
  'Review and Generate Text',
  'Submission Complete',
];

interface HorizontalLinearStepperProps {
  activeStep: number;
  stepContent: React.ReactNode[];
  poem?: string | null;
  setPoem?: (poem: string) => void;
}

export default function HorizontalLinearStepper({
  activeStep,
  stepContent,
  poem = null,
  setPoem,
}: HorizontalLinearStepperProps) {
  React.useEffect(() => {
    if (activeStep === 2 && !poem && setPoem) {
      const generatePoem = async () => {
        try {
          const response = await fetch('https//localhost:5000/poem-generation', {
            method: 'POST',
            body: JSON.stringify({
              userInput: 'tell me 10 lines poem on women equality',
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          const result = await response.json();
          if (result.reply && setPoem) {
            setPoem(result.reply);
          }
        } catch (e) {
          console.error('Error generating poem:', e);
        }
      };

      generatePoem();
    }
  }, [activeStep, poem, setPoem]);

  return (
    <div className="max-w-4xl mx-auto w-full mt-6">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep >= steps.length ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <div className="flex items-center gap-1">
            <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
            <Typography sx={{ ml: 2 }} variant="h5">
              Your Information has been submitted successfully!
            </Typography>
          </div>
          {poem && (
            <Box
              mt={4}
              p={4}
              sx={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                backgroundColor: '#f9f9f9',
                borderLeft: '4px solid #4CAF50',
                color: '#555',
                textAlign: 'center',
                maxWidth: '600px',
                whiteSpace: 'pre-line',
              }}
            >
              {poem.split('. ').map((line, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {line.trim()}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 1 }}>{stepContent[activeStep]}</Box>
      )}
    </div>
  );
}