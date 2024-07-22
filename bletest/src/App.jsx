import React, { useState, useEffect } from 'react';

const App = () => {
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const [detectedPackets, setDetectedPackets] = useState([]);

  const handleBluetoothToggle = () => {
    if (bluetoothActive) {
      window.BluetoothInterface.stopBluetooth();
    } else {
      window.BluetoothInterface.startBluetooth();
    }
    setBluetoothActive(!bluetoothActive);
  };

  useEffect(() => {
    window.handleDetectedPacket = () => {
      const newPacket = {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 90 + '%',
        y: Math.random() * 90 + '%'
      };
      setDetectedPackets(prevPackets => [...prevPackets, newPacket]);
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
          detectedPackets.map(packet => (
            <button
              key={packet.id}
              style={{ position: 'absolute', top: packet.y, left: packet.x, borderRadius: '50%' }}
              onClick={() => alert('앱을 실행 중인 다른 사용자입니다!')}
            >
              패킷 감지!
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
