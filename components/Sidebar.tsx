import React from 'react';
import Link from 'next/link';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

const SideMenu = ({ children }) => {
  return (
    <Sidebar.Pushable as={Segment} style={{ minheight: '100vh' }}>
      <Sidebar as={Menu} icon="labeled" vertical visible={true} width="thin">
        <Link href="/">
          <Menu.Item as="a">
            <Icon name="tasks" />
            Lists
          </Menu.Item>
        </Link>
        <Link href="/posts/new">
          <Menu.Item as="a">
            <Icon name="edit" />
            New
          </Menu.Item>
        </Link>
        <Menu.Item as="a">
          <Icon name="question circle" />
          Test
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="configure" />
          Config
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment floated="left">{children}</Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SideMenu;
