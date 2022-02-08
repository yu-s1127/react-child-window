import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Sub: FC = () => {
  const [value, setValue] = useState<string>('');

  const handleOnChangeStorage = (event: StorageEvent) => {
    if (event.key?.startsWith('param') && event.newValue) {
      // alert('test');
      // const conf = confirm('編集中ですが切り替えますか');
      // if (value.trim().length !== 0) {
      //   if (conf) window.location.href = `/${event.newValue}`;
      // }
      confirm('test');
      window.location.href = `/${event.newValue}`;
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleOnChangeStorage);

    return () => window.removeEventListener('storage', handleOnChangeStorage);
  }, [handleOnChangeStorage]);

  console.log(value);

  const params = useParams();
  return (
    <div>
      <p>{params.word}</p>
      <input
        className="border rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Sub;
