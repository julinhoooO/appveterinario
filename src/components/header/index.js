import React, {useState} from 'react';
import {Header, Container} from './styles';

import {Menu} from 'react-native-paper';

export default function AppHeader({
  navigation,
  backProps = null,
  content = null,
  title,
  menuItems,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);
  return (
    <Container>
      <Header>
        <Header.BackAction
          onPress={() => {
            if (backProps) {
              navigation.navigate(backProps.screen, backProps.screenProps);
            } else {
              navigation.goBack();
            }
          }}
        />
        {content ? content : <Header.Content title={title ? title : ''} />}
        {menuItems && menuItems.length && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Header.Action icon="dots-vertical" onPress={openMenu} />}>
            {menuItems.map(item => (
              <Menu.Item
                key={item.title}
                onPress={() => {
                  closeMenu();
                  item.onPress();
                }}
                title={item.title}
                icon={item.icon}
                disabled={item.disable}
              />
            ))}
          </Menu>
        )}
      </Header>
    </Container>
  );
}
