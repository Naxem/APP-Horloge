import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import styles from './styles';

export default function App() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const startChrono = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIntervalId(
        setInterval(() => {
          setTime((prevState) => {
            const seconds = prevState.seconds + 1;
            const minutes = prevState.minutes + Math.floor(seconds / 60);
            const hours = prevState.hours + Math.floor(minutes / 60);
            return {
              hours: hours,
              minutes: minutes % 60,
              seconds: seconds % 60,
            };
          });
        }, 1000)
      );
    }
  };

  const stopChrono = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  const resetChrono = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
    clearInterval(intervalId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {time.hours} : {time.minutes} : {time.seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={() => startChrono()} />
        <Button title="Stop" onPress={() => stopChrono()} />
        <Button title="Reset" onPress={() => resetChrono()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '200',
  }
});
