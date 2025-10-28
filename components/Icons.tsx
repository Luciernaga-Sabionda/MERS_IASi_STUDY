
import React from 'react';

type IconProps = {
  className?: string;
};

const defaultProps: IconProps = {
  className: 'w-10 h-10'
};

export const BrainIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.871 4.129a3 3 0 013.84-1.424l4.286 1.428a3 3 0 012.23 2.684l.535 5.357a3 3 0 01-1.424 3.84l-4.286 1.428a3 3 0 01-3.84-1.424l-.535-5.357a3 3 0 011.424-3.84l4.286-1.428" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.63 19.371a3 3 0 01-3.84 1.424l-4.286-1.428a3 3 0 01-2.23-2.684l-.535-5.357a3 3 0 011.424-3.84l4.286-1.428" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

export const DatabaseIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5" />
  </svg>
);

export const ScaleIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-4-4m4 4l4-4M4 8h16M4 16h16" />
    </svg>
);

export const LightBulbIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14.25l-2.05-2.05a.75.75 0 011.06-1.06L10 12.69l3.44-3.44a.75.75 0 011.06 1.06L10.5 14.25zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 01-12 0m12 0v-1.04a4.5 4.5 0 00-4.5-4.5h-3a4.5 4.5 0 00-4.5 4.5v1.04m12 0a9.094 9.094 0 01-12 0" />
    </svg>
);

export const RecycleIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-5.234-4.266-9.5-9.5-9.5S.5 6.766.5 12s4.266 9.5 9.5 9.5 9.5-4.266 9.5-9.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.75L12 14.25 7.5 9.75" />
    </svg>
);

export const RocketLaunchIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.42 0-10.24 2.66-13.08 6.75" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = defaultProps.className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.25-11.494v11.494c0 1.24 1.01 2.25 2.25 2.25h6c1.24 0 2.25-1.01 2.25-2.25V6.253M12 6.253h6.375c1.24 0 2.25-1.01 2.25-2.25S19.615 1.75 18.375 1.75H5.625c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25H12z" />
    </svg>
);
