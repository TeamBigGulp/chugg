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
      Gulp File
      <Codemirror value={this.props.value} onChange={this.props.codeChange} options={options} />
      </div>
    )
  }
});

module.exports = Gulpview;
