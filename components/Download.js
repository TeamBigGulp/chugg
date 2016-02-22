var React = require('react');

var Download = React.createClass({
  render: function () {
    return (
      <div id='download'>
      <form id="download-files" onSubmit={this.props.download}>
      <input type="submit" value="Download Files" />
      </form>
      </div>
    )
  }
});

module.exports = Download;
