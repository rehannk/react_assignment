import React, { useState } from "react";

import { Anchor, Drawer, Button } from "antd";

const { Link } = Anchor;

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-hospital"></i>
          <a href="/">Hospital</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/" title="Home" />
            <Link href="/about" title="About" />
            {localStorage.getItem("login") ? (
              <Link href="/logout" title="Sign Out" />
            ) : (
              <Link href="/login" title="Sign In" />
            )}
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="/" title="Home" />
              <Link href="/about" title="About" />
              {localStorage.getItem("login") ? (
                <Link href="/logout" title="Sign Out" />
              ) : (
                <Link href="/login" title="Sign In" />
              )}
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
