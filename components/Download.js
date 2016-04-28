import React from 'react';
import { Button } from 'react-bootstrap';

const Download = (props) => (
  <div id="download" className="col-md-12">
  <form id="download-files" onSubmit={props.download}>
    <Button type="submit" value="Download Files" bsStyle="primary">Download</Button>
  </form>
  </div>
);

Download.propTypes = {
  download: React.PropTypes.func,
};

export default Download;
