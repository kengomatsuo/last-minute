import React from 'react';

const SignInDecoration = ({ color = '#BFBBA9', style }) => {
  return (
    <svg
      width='472.5'
      height='750'
      viewBox="0 0 504 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.4974 0C51.8462 4.71799 51.3532 9.9142 52.2991 15.1851L59.3648 54.5561C62.2915 70.8641 77.8843 81.7118 94.1923 78.7851L428.846 18.7268C439.54 16.8076 447.886 9.44212 451.539 0H53.4974Z"
        fill={color}
      />
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.7246 800L139.723 0H474C490.569 0 504 13.4315 504 30V724.484L501.078 782.931C496.248 793.027 485.938 800 474 800H99.7246Z"
        fill={color}
      />
      <path
        opacity="0.8"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M504 143.415V770C504 786.569 490.569 800 474 800H46.945L13.5796 776.651C0.00472158 767.152 -3.29899 748.446 6.20052 734.872L430.476 128.579C439.976 115.005 458.681 111.701 472.256 121.2L504 143.415Z"
        fill={color}
      />
    </svg>
  );
};

export default SignInDecoration;
