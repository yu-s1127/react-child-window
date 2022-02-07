import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const Sub: FC = () => {
  const params = useParams();
  return <div>{params.word}</div>;
};

export default Sub;
