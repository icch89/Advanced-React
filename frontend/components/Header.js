import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";
import NProgress from "nprogress";
import { Menu, Button } from "antd";
import User from "./User";
import Signout from "./Signout";
import Cart from "./Cart";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.error();
};

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2 rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-colums: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-colums: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-colums: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <div>
    <User>
      {({ data: { me } }) => (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Logo>
              <Link href="/">
                <a> Starchefs</a>
              </Link>
            </Logo>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/items">
              <a>Shop</a>
            </Link>
          </Menu.Item>
          {me && (
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="3">
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link href="/me">
                  <a>Account</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggleCart => (
                    <Button onClick={toggleCart}>
                      <Cart />
                    </Button>
                  )}
                </Mutation>
              </Menu.Item>
              <Menu.Item key="8">
                <Signout />
              </Menu.Item>
            </Menu>
          )}
          {!me && (
            <Menu.Item key="4">
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      )}
    </User>
    <div className="sub-bar">
      <p>Search</p>
    </div>
  </div>
);

export default Header;
