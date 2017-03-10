/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import DownloadManager from 'react-native-download-manager';

export default class DownloadManagerTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      description: '',
      url: ''
    }
  }
  componentDidMount() {
    DownloadManager.onProgress((res) => {
      this.setState({
        ...res
      })
    })
  }
  
  handleDownload() {
    DownloadManager.download({
      url: 'http://pic62.nipic.com/file/20150319/12632424_132215178296_2.jpg',
      description: '12632424_132215178296_2.jpg',
    },(res)=>{
      Alert.alert('info', JSON.stringify(res));
      this.setState({
        ...res
      })
    });
  }
  mapManagerStatus(status) {
    switch(status) {
      case DownloadManager.STATUS_BUSY:
        return '目前任然有任务进行或者一直没有返回结果'
      case DownloadManager.STATUS_FAILED:
        return '下载失败';
      case DownloadManager.STATUS_PAUSED:
        return '下载暂停';
      case DownloadManager.STATUS_PENDING:
        return '排队等候';
      case DownloadManager.STATUS_RUNNING:
        return '正在下载';
      case DownloadManager.STATUS_SUCCESSFUL:
        return '下载成功';
    }
    return '';
  }
  render() {
    const { status, description, url } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.handleDownload()}>
          <Text>下载</Text>
        </TouchableOpacity>
        <View>
          <Text>{`状态：${this.mapManagerStatus(status)}`}</Text>
          <Text>{`文件名称：${description}`}</Text>
          <Text>{`下载地址：${url}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DownloadManagerTest', () => DownloadManagerTest);
