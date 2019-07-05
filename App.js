import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Switch } from 'react-native';
import { Constants } from 'expo';
import { vibrate } from './utils'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stop: true,
      long: true,
      minutes: 0,
      seconds: 5
    }
  }

  componentDidMount() {
    theInterval = setInterval(this.inc, 1000);
  }

  // Toggles timer button
  startStopTimer = () => {
    this.setState(state => ({
      stop: !this.state.stop
    }))
    if (this.state.stop) {
      clearInterval(theInterval)
    }
    else {
      theInterval = setInterval(this.inc, 1000)
    }
  }

  resetTimer = () => {
    clearInterval(theInterval)
    if (this.state.long) {
      this.setState(state => ({
        minutes: 20,
        seconds: 0,
        stop: true
      }))
    }
    else {
      this.setState(state => ({
        minutes: 5,
        seconds: 0,
        stop: true
      }))
    }
    theInterval = setInterval(this.inc, 1000)

  }

  // Countdown function
  inc = () => {
    // Is timer at 00?
    if (this.state.seconds == 0 && this.state.minutes == 0) {
      vibrate()
      // Toggle
      this.setState(prevState => ({
        long: !prevState.long
      }));
      // Reset 
      this.resetTimer()




    }
    // counts down seconds
    else if (this.state.seconds > 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }));
    }
    // When seconds reach 00, decrement minutes
    else if (this.state.seconds == 0) {
      this.setState(prevState => ({
        seconds: 59,
        minutes: prevState.minutes - 1,
      }));
    }
  }



  // Toggles long and short timer
  longShortTimer = () => {
    this.setState(prevState => ({
      long: !prevState.long
    }));
    if (this.state.long) {
      this.setState({
        minutes: 5,
        seconds: 0
      })
    }
    else {
      this.setState({
        minutes: 20,
        seconds: 0
      })
    }
  }

  render() {
    let textSeconds = this.state.seconds.toString()
    if (this.state.seconds.toString().length < 2) {
      textSeconds = "0" + this.state.seconds.toString()
    }
    let textMinutes = this.state.minutes.toString()
    if (this.state.minutes.toString().length < 2) {
      textMinutes = "0" + this.state.minutes.toString()
    }

    // if (this.state.long) {
    return (
      <View style={styles.appContainer} >

        <Text style={styles.title}>Pomodoro Timer</Text>

        {this.state.long && <Text style={styles.subtitle}>Work</Text>}
        {!this.state.long && <Text style={styles.subtitle}>Break</Text>}

        <View style={styles.buttonGroup}>

          {/* show if timer running */}
          {this.state.stop && <Button
            title="stop"
            onPress={this.startStopTimer}
            type="outline"
            color='gray'
            raised='true'
          />}

          {/* show if timer stopped at more than 0 */}
          {!this.state.stop && (this.state.seconds > 0 || this.state.minutes > 0) && <Button
            title="start"
            onPress={this.startStopTimer}
            type="outline"
            color='gray'
            raised='true'
          />}


          {/* always show reset button */}
          <Button
            title="reset"
            onPress={this.resetTimer}
            type='outline'
            color='gray'
            raised='true'
          />

          {/* show if timer stopped at 0 */}
          {/* {!this.state.stop && this.state.seconds == 0 && this.state.minutes == 0 && <Button
          title="reset"
          onPress={this.resetTimer}
        />} */}
        </View>

        {/* <View style={styles.inputBox}>
            <TextInput
              style={styles.inputContainer}
              placeholder="MM"
              name="minutes"
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ minutes: text })}
              maxLength={4}
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="SS"
              name="seconds"
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ seconds: text })}
              maxLength={2}
            />
          </View> */}

        <Text style={styles.numbers}>
          {textMinutes}:{textSeconds}
        </Text>
        {this.state.long && <Text >Switch to Break</Text>}
        {!this.state.long && <Text >Switch to Work</Text>}
        <Switch
          onValueChange={this.longShortTimer} value={this.state.long} />
      </View>
    )
  }
}
// - Timer should display minutes and seconds in text   
// - Timer should count down seconds until it reaches 00:00  
// - Phone should buzz when timer reaches 0 
// - Timers should switch between 25 and 5 minutes 
// - Timer should be able to start, stop, and reset

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3

  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center',

  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  count: {
    fontSize: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    margin: 10,
    fontSize: 42,
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numbers: {
    padding: 2,
    fontSize: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  switchBox: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
  }
});