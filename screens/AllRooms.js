import React, { Component } from 'react';
import { Form, Item, Input, Label, Button, Icon, Toast } from 'native-base';
import { Text, View } from 'react-native';
import AllRooms from '../components/listRooms';
const CREATE_ROOM = 'CREATE_ROOM';
import { SERVER_URL } from 'react-native-dotenv';
const host = SERVER_URL;
import axios from 'axios';
export default class Rooms extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      showToast: false,
      rooms: {},
      loading: false
    };
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms() {
    const url = `${host}/rooms`;
    this.setState({ loading: true });
    axios
      .get(url)
      .then(res => res.data)
      .then(res => {
        this.setState({
          rooms: res,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  createRoom() {
    if (this.state.name) {
      this.props.navigation.state.params.socket.emit(
        CREATE_ROOM,
        this.state.name
      );
      Toast.show({
        text: 'Room Created!',
        position: 'top',
        buttonText: 'Okay'
      });
    } else {
      Toast.show({
        text: 'Please Enter Room Name!',
        buttonText: 'Okay'
      });
    }
  }
  handleChange(text) {
    this.setState({ name: text });
  }
  render() {
    let socket = this.props.navigation.state.params.socket;
    let navigate = this.props.navigation.navigate;
    return (
      <View style={styles.main}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={styles.backButton} name="arrow-back" />
        </Button>
        <View style={styles.items}>
          <Text style={styles.title}>LOBBY </Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name} onChangeText={this.handleChange} />
            </Item>
            <Button
              onPress={this.createRoom}
              style={{ marginTop: 40 }}
              full
              light>
              <Text style={{ letterSpacing: 2 }}>Create a Room</Text>
            </Button>
          </Form>
        </View>
        <Text style={styles.smallTitle}>All Rooms</Text>
        <AllRooms
          rooms={this.state.rooms}
          socket={socket}
          navigate={navigate}
        />
      </View>
    );
  }
}

const styles = {
  main: {
    backgroundColor: '#3D464E',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Orbitron',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 0,
    letterSpacing: 2
  },
  smallTitle: {
    fontFamily: 'Orbitron',
    fontSize: 25,
    marginBottom: 0,
    textAlign: 'center',
    letterSpacing: 2
  },
  items: {
    margin: 30
  },
  backButton: {
    marginTop: 10,
    color: 'black'
  }
};
