import { useState, useEffect, useRef } from 'react';

function App() {
  const [time, setTime] = useState(0); // Toplam milisaniye
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Kronometre Çalıştırma Mantığı
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Milisaniyeyi Saat:Dakika:Saniye formatına çevirme
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return { hours, minutes, seconds };
  };

  // Kullanıcı input değiştirdiğinde (Düzenleme Modu)
  const handleInputChange = (type, value) => {
    const { hours, minutes, seconds } = formatTime(time);
    let newMs = 0;
    
    // Girilen değeri sayıya çevir, boşsa 0 yap
    const val = parseInt(value) || 0;
    
    if (type === 'h') newMs = val * 3600000 + minutes * 60000 + seconds * 1000;
    if (type === 'm') newMs = hours * 3600000 + val * 60000 + seconds * 1000;
    if (type === 's') newMs = hours * 3600000 + minutes * 60000 + val * 1000;
    
    setTime(newMs);
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-12 text-blue-400">Kronometre</h1>
      
      <div className="flex gap-4 text-7xl font-mono mb-12">
        {/* Duruyorsa Input, Çalışıyorsa Metin */}
        {!isRunning ? (
          <>
            <input type="number" value={hours} onChange={(e) => handleInputChange('h', e.target.value)} className="bg-gray-800 w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />:
            <input type="number" value={minutes} onChange={(e) => handleInputChange('m', e.target.value)} className="bg-gray-800 w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />:
            <input type="number" value={seconds} onChange={(e) => handleInputChange('s', e.target.value)} className="bg-gray-800 w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </>
        ) : (
          <span>
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className="flex gap-6 text-xl font-semibold">
        <button 
          onClick={() => setIsRunning(!isRunning)} 
          className={`px-10 py-3 rounded-xl transition-all shadow-lg ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isRunning ? 'Durdur' : 'Başlat'}
        </button>
        <button 
          onClick={() => {setIsRunning(false); setTime(0);}} 
          className="bg-gray-700 hover:bg-gray-600 px-10 py-3 rounded-xl transition-all shadow-lg"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}

export default App;
