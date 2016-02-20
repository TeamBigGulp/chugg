var React = require('react');
var ReactDOM = require('react-dom');
var Gulpview = require('./Gulpview');
var Packagejson = require('./Packagejson');
var $ = require('jquery');

var App = React.createClass({
  getInitialState: function(){
    return {
      gulp: true,
      json: false
    }
  },
  postRequest: function(e){
    e.preventDefault();
    var data = $('#Gulpview').text();
    var gulpState = this.state.gulp;
    console.log('hey', data, gulpState, this.state.gulp);
    $.ajax({
      type: 'POST',
      url: '/gulp',
      data: JSON.stringify(gulpState),
      contentType: 'text/plain; charset=utf-8'
    });

  },
  render: function () {
    return (
      <div id='App'>
        App
        <Gulpview />
        <Packagejson />
        <form id="download-files" onSubmit={this.postRequest}>
          <input type="submit" value="Download Files" />
        </form>
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
