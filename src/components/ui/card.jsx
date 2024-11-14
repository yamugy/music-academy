import React from 'react';

const Card = ({ className, ...props }) => {
  return (
    <div
      className={`bg-card text-card-foreground shadow-sm border border-border rounded-lg hover:shadow transition-all ${className}`}
      {...props}
    />
  );
};

export default Card;