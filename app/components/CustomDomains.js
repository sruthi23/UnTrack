// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Table, AutoComplete } from 'element-react';
import Head from './Head';
import LeftMenu from './LeftMenu';

import routes from '../constants/routes';

export default class CustomDomains extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          type: 'expand',
          expandPannel(data) {
            return (
              <div>
                <p>State: {data.state}</p>
                <p>City: {data.city}</p>
                <p>Address: {data.address}</p>
                <p>Zip: {data.zip}</p>
              </div>
            );
          }
        },
        {
          label: 'Date',
          prop: 'date'
        },
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Actions',
          prop: 'state'
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }
      ],

      restaurants: [
        { value: 'vue', address: 'https://github.com/vuejs/vue' },
        { value: 'element', address: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', address: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', address: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', address: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', address: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', address: 'https://github.com/babel/babel' }
      ],
      value1: '',
      value2: ''
    };
  }

  querySearch(queryString, cb) {
    const { restaurants } = this.state;
    const results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    cb(results);
  }

  createFilter(queryString) {
    return restaurant =>
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  }

  handleSelect(item) {}

  render() {
    return (
      <div className="container">
        <Layout.Row gutter="20">
          <Layout.Col span="6">
            <div className="grid-content home-left">
              <LeftMenu />
            </div>
          </Layout.Col>
          <Layout.Col span="18">
            <div className="grid-content home-right">
              <Head />

              <h1>CustomDomains</h1>

              <AutoComplete
                placeholder="Please input"
                value={this.state.value1}
                fetchSuggestions={this.querySearch.bind(this)}
                onSelect={this.handleSelect.bind(this)}
              />

              <Table
                style={{ width: '100%' }}
                columns={this.state.columns}
                data={this.state.data}
                border={false}
                onCurrentChange={item => {
                  console.log(item);
                }}
              />
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
