import React, { useState, useEffect } from 'react';

const App = () => {
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const [detectedDevices, setDetectedDevices] = useState([]);

  const handleBluetoothToggle = () => {
    if (bluetoothActive) {
      window.BluetoothInterface.stopBluetooth();
    } else {
      window.BluetoothInterface.startBluetooth();
    }
    setBluetoothActive(!bluetoothActive);
  };

  useEffect(() => {
    window.handleDetectedDevice = (deviceAddress) => {
      const newDevice = {
        id: Math.random().toString(36).substr(2, 9),
        address: deviceAddress,
        x: Math.random() * 90 + '%',
        y: Math.random() * 90 + '%'
      };
      setDetectedDevices(prevDevices => [...prevDevices, newDevice]);
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
          detectedDevices.map(device => (
            <button
              key={device.id}
              style={{ position: 'absolute', top: device.y, left: device.x, borderRadius: '50%' }}
              onClick={() => alert(`기기 감지: ${device.address}`)}
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

export default App;
