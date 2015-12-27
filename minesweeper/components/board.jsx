var Tile = require('./tile');
var React = require('react');

var Board = React.createClass({
  render: function() {
    var that = this;
    var board = this.props.board;

    return (
      <div className='board'>
        {
          board.grid.map(function(row, rowIdx){
            return (
              <div className={'row ' + that.props.level} key={ rowIdx }>
              {
                row.map(function(tile, colIdx){
                  return(
                    <Tile
                      key = { rowIdx * that.props.board.gridSize + colIdx }
                      tile={ tile }
                      updateGame={ that.props.updateGame } />);
                })
              }
            </div>);
          })
        }
      </div>
    );
  }
});

module.exports = Board;
