import React, { useState, useEffect } from 'react';

const NewComponent = () => {
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const [detectedDevices, setDetectedDevices] = useState([]);
  const userId = "user123"; // 사용자의 ID
  const isLoggedIn = true; // 사용자의 로그인 상태

  const handleBluetoothToggle = () => {
    if (bluetoothActive) {
      window.BluetoothInterface.stopBluetooth();
    } else {
      window.BluetoothInterface.startBluetooth(userId, isLoggedIn);
    }
    setBluetoothActive(!bluetoothActive);
  };

  useEffect(() => {
    window.handleDetectedDevice = (userId, isLoggedIn) => {
      if (isLoggedIn === 'true') {
        setDetectedDevices((prevDevices) => {
          if (prevDevices.find(device => device.userId === userId)) {
            return prevDevices; // 이미 감지된 기기
          }
          const newDevice = {
            userId,
            x: Math.random() * 90 + '%',
            y: Math.random() * 90 + '%'
          };
          return [...prevDevices, newDevice];
        });
      }
    };

    window.clearDetectedDevice = (deviceId) => {
      setDetectedDevices((prevDevices) => prevDevices.filter(device => device.userId !== deviceId));
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ border: '1px solid black', height: '300px', position: 'relative', marginBottom: '40px' }}>
        {!bluetoothActive ? (
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            블루투스 통신 대기 중
          </p>
        ) : (
          // 감지된 기기가 로그인된 상태라면, 해당 기기의 사용자 ID를 화면에 표시하는 부분
          detectedDevices.map(device => (
            <button
              key={device.userId}
              style={{ position: 'absolute', top: device.y, left: device.x, borderRadius: '50%' }}
              onClick={() => alert(`기기 감지: ${device.userId}`)}
            >
              휴대폰 감지!
            </button>
          ))
        )}
      </div>
      <button onClick={handleBluetoothToggle}>
        {bluetoothActive ? '블루투스 통신 끝' : '블루투스 통신 시작'}
      </button>
    </div>
  );
};

export default NewComponent;
