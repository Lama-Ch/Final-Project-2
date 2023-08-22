import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
	return <Loader />;
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
	border: 2px solid rgba(0, 0, 0, 0.1);
	border-top: 2px solid #4caf50;
	border-radius: 50%;
	width: 16px;
	height: 16px;
	animation: ${spinAnimation} 1s linear infinite;
`;

export default LoadingSpinner;
