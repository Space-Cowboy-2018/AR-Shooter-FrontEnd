import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from 'native-base';
import styles from '../styles/globals';
import axios from 'axios';
const JOIN_ROOM = 'JOIN_ROOM';
const UPDATE_ROOMS = 'UPDATE_ROOMS';
import socket, { host } from '../socket';

class ListRooms extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: {}
    };
    this.getRooms = this.getRooms.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.receivingRooms = this.receivingRooms.bind(this);
  }

  componentDidMount() {
    this.getRooms();
    socket.on(UPDATE_ROOMS, rooms => {
      this.receivingRooms(rooms);
    });
  }
  receivingRooms(payload) {
    this.setState({ rooms: payload });
  }
  getRooms() {
    axios
      .get(`${host}/rooms`)
      .then(res => res.data)
      .then(roomsFound => this.setState({ rooms: roomsFound }))
      .catch(err => console.log(err));
  }
  handleJoinRoom(room) {
    const playerName = this.props.playerName;
    let navigate = this.props.navigate;
    socket.emit(JOIN_ROOM, room, playerName);
    navigate('Lobby', { room, playerName });
  }

  render() {
    const roomNames = Object.keys(this.state.rooms);

    return (
      <Content style={{ marginLeft: 20, marginRight: 20 }}>
        <Container style={styles.main}>
          <List style={{ marginTop: 0 }}>
            {roomNames.length === 0 ? (
              <Text style={styles.informativeText}> No rooms available. </Text>
            ) : (
              roomNames.map(name => {
                return (
                  <ListItem
                    avatar
                    key={name}
                    onPress={() => this.handleJoinRoom(name)}>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            'https://d30y9cdsu7xlg0.cloudfront.net/png/434333-200.png'
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>{name}</Text>
                      <Text note>Game in session.</Text>
                    </Body>
                    <Right>
                      <Text note>
                        {this.state.rooms[name].length} player(s) active.
                      </Text>
                    </Right>
                  </ListItem>
                );
              })
            )}
          </List>
        </Container>
      </Content>
    );
  }
}
export default ListRooms;
