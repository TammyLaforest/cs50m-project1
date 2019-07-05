import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Switch } from 'react-native';
import { Constants } from 'expo';
import { vibrate } from './utils'

export default class App extends React.Component {

  // Stop: is timer going or paused?
  // Long: is this the Work (long) timer or the break timer? 
  constructor(props) {
    super(props)
    this.state = {
      stop: true,
      long: true,
      text: "",

      minutesWork: 20,
      secondsWork: 0,
      minutesBreak: 5,
      secondsBreak: 0,

      minutes: 20,
      seconds: 0,
    }
  }

  componentWillMount() {

    theInterval = setInterval(this.inc, 1000);

    if (this.state.long) {
      this.setState({
        minutes: this.state.minutesWork,
        seconds: this.state.secondsWork,
      })
    } else {
      this.setState({
        minutes: this.state.minutesBreak,
        seconds: this.state.secondsBreak,
      })
    }
  }

  componentDidMount() {

    // clearInterval(theInterval)
  }


  // Toggles long and short timer
  // Callback function to ensure state changes before reset
  longShortTimer = () => {
    this.setState(prevState => ({
      long: !prevState.long,
    }), () => this.resetTimer());
  }

  resetTimer = () => {
    // Stop the timer
    clearInterval(theInterval)

    // Reset the work timer
    if (this.state.long) {
      this.setState(state => ({
        minutes: this.state.minutesWork,
        seconds: this.state.secondsWork,
        text: "",
        stop: true
      }))
    }
    // Reset the break timer
    else {
      this.setState(state => ({
        minutes: this.state.minutesBreak,
        seconds: this.state.secondsBreak,
        text: "",
        stop: true
      }))
    }

    // Restart timer
    theInterval = setInterval(this.inc, 1000)
  }

  // Stops and starts the timer
  startStopTimer = () => {
    // Toggle
    this.setState(state => ({
      stop: !this.state.stop,
    }))
    // Stop
    if (this.state.stop) {
      clearInterval(theInterval)
    }
    // Start
    else {
      theInterval = setInterval(this.inc, 1000)
      this.setState({
        text: "",
      })
    }
  }

  // Countdown function
  inc = () => {
    // Is timer at 00?
    if (this.state.seconds == 0 && this.state.minutes == 0) {
      // buzz
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

  handleText = (text) => {
    // stop timer
    clearInterval(theInterval)

    // reset number
    this.setState({
      minutes: text,
      textMinutesWork: text,
      stop: false
    })

  }

  render() {

    // Converts seconds to string of correct length
    let textSeconds = this.state.seconds.toString()
    if (this.state.seconds.toString().length < 2) {
      textSeconds = "0" + this.state.seconds.toString()
    }
    // Converts minutes to string of correct length
    let textMinutes = this.state.minutes.toString()
    if (this.state.minutes.toString().length < 2) {
      textMinutes = "0" + this.state.minutes.toString()
    }

    return (


      <View style={styles.appContainer} >

        <Text style={styles.title}>Pomodoro Timer</Text>


        {/* Toggles between work and break label */}
        {this.state.long && <Text style={styles.subtitle}>Work</Text>}
        {!this.state.long && <Text style={styles.subtitle}>Break</Text>}



        {/* Toggles between work and break timers */}
        <Switch
          onValueChange={this.longShortTimer}
          value={this.state.long}
          style={styles.switch} />

        {/* Toggles between work and break labels */}
        {this.state.long && <Text >Switch to Break</Text>}
        {!this.state.long && <Text >Switch to Work</Text>}

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
        </View>


        <Text style={styles.numbers} >
          {textMinutes}:{textSeconds}
        </Text>




        {/* Change timer length with text input */}
        {/* <Text>Change Work Timer</Text>
        <View style={styles.inputBox}>

          <TextInput
            style={styles.inputContainer}
            value={this.state.text}
            placeholder="MM"
            name="minutes"
            keyboardType='numeric'
            onChangeText={(text) => this.handleText(text)}
            maxLength={4}
          />
          <TextInput
            style={styles.inputContainer}
            value={this.state.textSecondsWork}
            placeholder="SS"
            name="seconds"
            keyboardType='numeric'
            onChangeText={(text) => {

              // stop timer
              clearInterval(theInterval)

              // reset number
              this.setState({
                seconds: text,
                textSecondsWork: text,
                stop: false
              })
            }
            }
            maxLength={2}
          />

        </View>
        <Text>Change Break Timer</Text>
        <View style={styles.inputBox}>

          <TextInput
            style={styles.inputContainer}
            value={this.state.textMinutesBreak}
            placeholder="MM"
            name="minutes"
            keyboardType='numeric'
            onChangeText={(text) => {

              // stop timer
              clearInterval(theInterval)

              // reset number
              this.setState({
                minutes: text,
                textMinutesBreak: text,
                stop: false
              })
            }
            }
            maxLength={4}
          />
          <TextInput
            style={styles.inputContainer}
            value={this.state.textSecondsBreak}
            placeholder="SS"
            name="seconds"
            keyboardType='numeric'
            onChangeText={(text) => {

              // stop timer
              clearInterval(theInterval)

              // reset number
              this.setState({
                seconds: text,
                textSecondsBreak: text,
                stop: false
              })
            }
            }
            maxLength={2}
          />

        </View>*/}
        {/* </View > */}
      </View>
    )
  }
}
// App requirements 
// - Timer should display minutes and seconds in text   
// - Timer should count down seconds until it reaches 00:00  
// - Phone should buzz when timer reaches 0 
// - Timers should switch between 25 and 5 minutes 
// - Timer should be able to start, stop, and reset

// ***Actual pomodoro method from Wikipedia ***
// Decide on the task to be done.
// Set the pomodoro timer (traditionally to 25 minutes).
// Work on the task.
// End work when the timer rings and put a checkmark on a piece of paper.
// If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.
// After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gainsboro',
    borderColor: 'gray',
    borderWidth: 20,

  },
  title: {
    color: 'blue',
    // fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 35,
    alignItems: 'center',
    paddingBottom: 100
  },
  subtitle: {
    color: 'black',
    // fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20

  },
  switch: {
    paddingBottom: 20
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
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
    // margin: 1,
    borderRadius: 8,
    borderWidth: 15,
    borderColor: '#d6d7da',
  }
});