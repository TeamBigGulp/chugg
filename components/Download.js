import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Download extends Component {
  render() {
    return (
      <div id='download' className="col-md-12">
      <form id="download-files" onSubmit={this.props.download}>
        <Button type="submit" value="Download Files" bsStyle="primary">Download Files</Button>
      </form>
      </div>
    )
  }
}
