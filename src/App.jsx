import { useState, useEffect, useRef } from 'react';

function App() {
  // Bu baslangic degeri, kronometrenin uygulama acildiginda hangi sureden baslayacagini belirler.
  const [time, setTime] = useState(0);
  // Bu state'i degistirirsen buton metni ve kronometrenin akisi degisir.
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

// Arka Planda Uyumayan (Gerçek Zamanlı) Saat Motoru
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // Kronometre ilk çalıştığı andaki "gerçek" saati kaydediyoruz
      let lastTick = Date.now(); 

      intervalId = setInterval(() => {
        const now = Date.now(); // Şimdiki gerçek saat
        const delta = now - lastTick; // İki çalışma arasında geçen KESİN süre (fark)
        lastTick = now; // Bir sonraki tur için şimdiki zamanı kaydet
        
        // Artık sabit 1000 eklemiyoruz, aradan ne kadar zaman geçtiyse onu ekliyoruz!
        setTime((prevTime) => prevTime + delta); 
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  // Buradaki hesaplama, ekrandaki saatin saat:dakika:saniye formatinda nasil gosterilecegini belirler.
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return { hours, minutes, seconds };
  };

  // Bu fonksiyon, inputlara yazilan degerlerin toplam sureye nasil cevrilecegini kontrol eder.
  const handleInputChange = (type, value) => {
    const { hours, minutes, seconds } = formatTime(time);
    let newMs = 0;

    // Burayi degistirirsen bos veya gecersiz girislerin nasil ele alinacagini ayarlarsin.
    const val = parseInt(value, 10) || 0;

    if (type === 'h') newMs = val * 3600000 + minutes * 60000 + seconds * 1000;
    if (type === 'm') newMs = hours * 3600000 + val * 60000 + seconds * 1000;
    if (type === 's') newMs = hours * 3600000 + minutes * 60000 + val * 1000;

    setTime(newMs);
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    // Bu kapsayicidaki class'lar sayfanin genel yerlesimini, arka planini ve yazi stilini degistirir.
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-sans">
      {/* Bu baslik metnini veya class'larini degistirirsen sayfanin ust basligi ve stili degisir. */}
      <h1 className="text-4xl font-bold mb-12 text-orange-700">Yasin Baba The Godfather</h1>

      {/* Buradaki class'lar saat alaninin boyutunu, bosluklarini ve fontunu belirler. */}
      <div className="flex gap-4 text-7xl font-mono mb-12 text-white">
        {/* Bu kosul, kronometre dururken input; calisirken salt okunur metin gosterilmesini saglar. */}
        {!isRunning ? (
          <>
            {/* Bu input saat degerini degistirir; width ve renk class'lari kutunun gorunumunu etkiler. */}
            <input
              type="number"
              value={hours}
              onChange={(e) => handleInputChange('h', e.target.value)}
              className="bg-gray-900 text-white w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            :
            {/* Bu input dakika degerini degistirir; ayni class yapisi diger kutularla uyumlu gorunumu kontrol eder. */}
            <input
              type="number"
              value={minutes}
              onChange={(e) => handleInputChange('m', e.target.value)}
              className="bg-gray-900 text-white w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            :
            {/* Bu input saniye degerini degistirir; burada farkli genislik veya renk deneyebilirsin. */}
            <input
              type="number"
              value={seconds}
              onChange={(e) => handleInputChange('s', e.target.value)}
              className="bg-gray-900 text-white w-32 text-center rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </>
        ) : (
          // Bu gorunum yalnizca kronometre calisiyorken ekrana basilan sabit zamani kontrol eder.
          <span className="text-white">
            {String(hours).padStart(2, '0')}:
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Buradaki class'lar butonlarin dizilimini, bosluklarini ve yazi stilini belirler. */}
      <div className="flex gap-6 text-xl font-semibold">
        <button
          // Bu onClick davranisini degistirirsen baslat/durdur mantigi degisir.
          onClick={() => setIsRunning(!isRunning)}
          // Bu class yapisi, butonun calisiyor veya duruyor olmasina gore renk degistirmesini saglar.
          className={`px-10 py-3 rounded-xl transition-all shadow-lg ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {/* Bu metni degistirirsen buton uzerinde kullaniciya gosterilen yazi degisir. */}
          {isRunning ? 'Durdur' : 'Baslat'}
        </button>

        <button
          // Buradaki setTime(0) degerini degistirirsen sifirlama yerine farkli bir baslangic suresi verebilirsin.
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
          className="bg-gray-700 hover:bg-gray-600 px-10 py-3 rounded-xl transition-all shadow-lg"
        >
          Sifirla
        </button>
      </div>
    </div>
  );
}

export default App;
