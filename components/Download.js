import React, {Component} from 'react';

export default class Download extends Component {
  render() {
    return (
      <div id='download'>
      <form id="download-files" onSubmit={this.props.download}>
      <input type="submit" value="Download Files" />
      </form>
      </div>
    )
  }
}
