document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有需要的 HTML 元素
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const add1Btn = document.getElementById('add1Btn');
    const add5Btn = document.getElementById('add5Btn');
    const add10Btn = document.getElementById('add10Btn');

    // 載入一個音訊檔案
    const alarmSound = new Audio('alarm.mp3');

    let totalSeconds = 0;
    let isRunning = false;
    let timerInterval = null;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const updateDisplay = () => {
        timerDisplay.textContent = formatTime(totalSeconds);
    };

    const startTimer = () => {
        if (isRunning || totalSeconds <= 0) {
            return;
        }
        isRunning = true;
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                stopTimer();
                console.log('時間到，嘗試播放鈴聲...');
                alarmSound.play();
                alert('時間到！');
            }
        }, 1000);
    };

    const stopTimer = () => {
        isRunning = false;
        clearInterval(timerInterval);
        // 新增：停止播放音樂並重設播放位置
        alarmSound.pause();
        alarmSound.currentTime = 0;
    };

    const resetTimer = () => {
        stopTimer();
        totalSeconds = 0;
        updateDisplay();
        // 新增：確保重設時音樂也停止
        alarmSound.pause();
        alarmSound.currentTime = 0;
    };

    const addTime = (minutes) => {
        totalSeconds += minutes * 60;
        updateDisplay();
    };

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    add1Btn.addEventListener('click', () => addTime(1));
    add5Btn.addEventListener('click', () => addTime(5));
    add10Btn.addEventListener('click', () => addTime(10));

    updateDisplay();
});