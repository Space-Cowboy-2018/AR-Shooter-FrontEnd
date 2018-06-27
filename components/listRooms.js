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
const ListRooms = props => {
  let rooms = props.rooms;

  rooms = Object.keys(rooms);
  return (
    <Content style={{ marginLeft: 20, marginRight: 20 }}>
      <Container style={styles.main}>
        <List style={{ marginTop: 0 }}>
          {rooms &&
            rooms.map(room => {
              return (
                <ListItem
                  avatar
                  key={room}
                  onPress={() => props.navigate('Lobby')}>
                  <Left>
                    <Thumbnail
                      source={{
                        uri:
                          'https://d30y9cdsu7xlg0.cloudfront.net/png/434333-200.png'
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{room}</Text>
                    <Text note>Stuff goes here.</Text>
                  </Body>
                  <Right>
                    <Text note>
                      {props.rooms[room].length} player(s) active.
                    </Text>
                  </Right>
                </ListItem>
              );
            })}
        </List>
      </Container>
    </Content>
  );
};

export default ListRooms;
