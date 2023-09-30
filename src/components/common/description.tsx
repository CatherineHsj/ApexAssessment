import React, { FC } from 'react';

interface DescriptionProps {
  label: string;
  value: string | number;
}

const Description: FC<DescriptionProps> = ({ label, value }) => {
  return (
    <p>
      <strong>{label} : </strong> {value}
    </p>
  );
};

export default Description;
