import React, {Component} from 'react';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import Packagejson from './Packagejson';
import Gulpview from './Gulpview';

export default class Editor extends Component {
  render () {
    return (
      <Tabs defaultActiveKey={1}>
        <Tab eventKey={1} title="Gulpfile">
          Gulpview Here
        </Tab>

        <Tab eventKey={2} title="package.json">
          Packagejson Here
        </Tab>
      </Tabs>
    );
  }
}
