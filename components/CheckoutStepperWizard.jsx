import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Login',
    'Dirección de envío',
    'Método de pago',
    'Realizar pedido',
  ];

export default function HorizontalLabelPositionBelowStepper({activeStep}) {
  return (
    <Box mt={8} mb={5} sx={{ width: '89%' }}>
      <Stepper  activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}