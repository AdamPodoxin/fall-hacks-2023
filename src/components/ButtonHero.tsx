import React, { ReactNode } from 'react';
import '../styles/buttonHero.css'

interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
  }
  
  export default function Button({
    onClick,
    children,
  }: Props) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }