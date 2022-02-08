import React, { FC, useEffect, useState } from 'react';

const Main: FC = () => {
  const [value, setValue] = useState<string>('');
  const [tabFocus, setTabFocus] = useState<boolean>(false);
  const [windowObjects, setWindowObjects] = useState<Array<Window>>([]);

  const onClickGenerateChildWindow = () => {
    if (value.trim().length === 0) {
      alert('何か文字入れてね');
      return;
    }

    localStorage.setItem('param', value);

    const filteredWindowObj = windowObjects.filter((obj) => {
      return obj.window !== null;
    });

    console.log(filteredWindowObj);
    if (filteredWindowObj.length === 0) {
      const uniqueId = Math.random().toString();
      const url = `http://localhost:3000/${value}`;

      const windowObj = window.open(url, uniqueId, 'width=400,height=300');
      if (windowObj === null) return;
      setWindowObjects((prevState) => [windowObj, ...prevState]);
    } else {
      setTimeout(() => handleOnFocus(), 200);
    }
  };

  const handleOnFocus = () => {
    console.log(document.hasFocus());
    windowObjects
      .filter((obj) => {
        return obj.window !== null;
      })
      .map((obj) => {
        obj.focus();
      });

    setWindowObjects((prevState) =>
      prevState.filter((obj) => obj.window !== null)
    );
  };

  const onClickTabFocus = () => {
    setTabFocus((prevState) => !prevState);
  };

  const handleTabFocus = () => {
    if (document.visibilityState === 'visible') {
      console.log(document.hasFocus());
      handleOnFocus();
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleTabFocus);

    return () =>
      document.removeEventListener('visibilitychange', handleTabFocus);
  }, [tabFocus]);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center font-sans">
      <p>インプットに入れた文字列が子ウィンドウのURLに入るよ</p>
      <input
        className="border rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex flex-row justify-around">
        <button
          className="border border-black bg-gray-300 m-2"
          onClick={onClickGenerateChildWindow}
        >
          子ウィンドウ生成 or URL変更
        </button>
        <button
          className="border border-black bg-gray-300 m-2"
          onClick={handleOnFocus}
        >
          フォーカス
        </button>
        <button
          className={`border border-black m-2 ${tabFocus ? 'bg-gray-300' : ''}`}
          onClick={onClickTabFocus}
        >
          タブ切り替え時フォーカス
        </button>
      </div>
    </div>
  );
};

export default Main;
