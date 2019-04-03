// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Checkbox, Form } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import routes from '../constants/routes';
import db from '../utils/db';

export default class Configure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: db.get('config').value(),
      form: {}
    };
  }

  componentWillMount() {
    const { config } = this.state;
    let cheklist = [];

    Object.keys(config).map(function(key, index) {
      console.log(key, config[key]);
      if (config[key] === true) {
        cheklist.push(key);
      }
    });
    console.log(cheklist);
    this.setState({
      form: Object.assign({}, this.state.form, { ['type']: cheklist })
    });
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type } = this.state.form;
    let configCopy = Object.assign({}, this.state.config);

    Object.keys(configCopy).map(function(key, index) {
      if (type.indexOf(key) > -1) {
        configCopy[key] = true;
      } else {
        configCopy[key] = false;
      }
    });

    this.setState({ config: configCopy }, () => {
      db.set('config', this.state.config).write();
    });
  }

  render() {
    return (
      <div className="container">
        <Layout.Row>
          <Layout.Col span="6">
            <div className="grid-content home-left">
              <LeftMenu />
            </div>
          </Layout.Col>
          <Layout.Col span="18">
            <Head />

            <div className="grid-content home-right">
              <h1>Settings</h1>
              <Form
                ref="form"
                className="en-US"
                model={this.state.form}
                labelWidth="120"
              >
                <Form.Item prop="type">
                  <Checkbox.Group
                    value={this.state.form.type}
                    onChange={this.onChange.bind(this, 'type')}
                  >
                    <Checkbox
                      label="Unified hosts = (adware + malware)"
                      value="unified"
                      name="type"
                    />
                    <Checkbox label="fakenews" value="fakenews" name="type" />
                    <Checkbox label="gambling" value="gambling" name="type" />
                    <Checkbox label="porn" value="porn" name="type" />
                    <Checkbox label="social" value="social" name="type" />
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
