
import React from 'react';
import { useParams } from 'react-router-dom';

const Card: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Card ID: {id}</h1>
    </div>
  );
}

export default Card;