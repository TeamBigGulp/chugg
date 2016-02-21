var React = require('react');
var Codemirror = require('react-codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');


var Gulpview = React.createClass({
  render: function () {
    var options = {
            lineNumbers: true,
            mode: 'javascript'
        };
    return (
      <div id='Gulpview'>
<Codemirror value={this.props.value} onChange={this.props.updateCode} options={options} />
<form id="download-files" onSubmit={this.props.postRequest}>
<input type="submit" value="Download Files" />
</form>
      </div>
    )
  }
});

module.exports = Gulpview;
