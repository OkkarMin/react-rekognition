import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Container, Grid, Menu } from 'semantic-ui-react'

import Header from './header'

import 'semantic-ui-less/semantic.less'

const LinkedItem = ({ children, ...props }) => (
  <Menu.Item as={Link} activeClassName="active" {...props}>
    {children}
  </Menu.Item>
)

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />

        <Container>
          <Grid relaxed stackable>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Menu vertical fluid>
                <LinkedItem to="/" exact>
                  Home
                </LinkedItem>
                <LinkedItem to="/create-collection">
                  Create Collection
                </LinkedItem>
                <LinkedItem to="/collections">View Collections</LinkedItem>
                <LinkedItem to="/rekognize">Recognize</LinkedItem>
                <LinkedItem to="/404">404 Example Page</LinkedItem>
                <LinkedItem to="/login">Login Page</LinkedItem>
              </Menu>
            </Grid.Column>

            <Grid.Column mobile={16} tablet={8} computer={8}>
              {children}
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )}
  />
)

export default Layout
