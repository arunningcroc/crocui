import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chess from 'chess.js';
/*const { Chess } = require('chess.js')*/
const chess = new Chess();
const coords = ["a8","b8","c8","d8","e8","f8","g8","h8",
                "a7","b7","c7","d7","e7","f7","g7","h7",
                "a6","b6","c6","d6","e6","f6","g6","h6",
                "a5","b5","c5","d5","e5","f5","g5","h5",
                "a4","b4","c4","d4","e4","f4","g4","h4",
                "a3","b3","c3","d3","e3","f3","g3","h3",
                "a2","b2","c2","d2","e2","f2","g2","h2",
                "a1","b1","c1","d1","e1","f1","g1","h1",]
function Square(props) {
    return (
        <button className={props.color} onClick={props.onClick}>
        {props.value}
        </button>
  );
}

class Board extends React.Component {
    renderSquare(i,c) {
        return <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                color={c}
                />;
    }

    
    render() {

    return (
      <div>
        <div className="board-row">
            {this.renderSquare(0,"white")}
            {this.renderSquare(1,"black")}
            {this.renderSquare(2,"white")}
            {this.renderSquare(3,"black")}
            {this.renderSquare(4,"white")}
            {this.renderSquare(5,"black")}
            {this.renderSquare(6,"white")}
            {this.renderSquare(7,"black")}
        </div>
        <div className="board-row">
            {this.renderSquare(8,"black")}
            {this.renderSquare(9,"white")}
            {this.renderSquare(10,"black")}
            {this.renderSquare(11,"white")}
            {this.renderSquare(12,"black")}
            {this.renderSquare(13,"white")}
            {this.renderSquare(14,"black")}
            {this.renderSquare(15,"white")}
        </div>
        <div className="board-row">
            {this.renderSquare(16,"white")}
            {this.renderSquare(17,"black")}
            {this.renderSquare(18,"white")}
            {this.renderSquare(19,"black")}
            {this.renderSquare(20,"white")}
            {this.renderSquare(21,"black")}
            {this.renderSquare(22,"white")}
            {this.renderSquare(23,"black")}
        </div>
        <div className="board-row">
            {this.renderSquare(24,"black")}
            {this.renderSquare(25,"white")}
            {this.renderSquare(26,"black")}
            {this.renderSquare(27,"white")}
            {this.renderSquare(28,"black")}
            {this.renderSquare(29,"white")}
            {this.renderSquare(30,"black")}
            {this.renderSquare(31,"white")}
        </div>
        <div className="board-row">
            {this.renderSquare(32,"white")}
            {this.renderSquare(33,"black")}
            {this.renderSquare(34,"white")}
            {this.renderSquare(35,"black")}
            {this.renderSquare(36,"white")}
            {this.renderSquare(37,"black")}
            {this.renderSquare(38,"white")}
            {this.renderSquare(39,"black")}
        </div>
        <div className="board-row">
            {this.renderSquare(40,"black")}
            {this.renderSquare(41,"white")}
            {this.renderSquare(42,"black")}
            {this.renderSquare(43,"white")}
            {this.renderSquare(44,"black")}
            {this.renderSquare(45,"white")}
            {this.renderSquare(46,"black")}
            {this.renderSquare(47,"white")}
        </div>
        <div className="board-row">
            {this.renderSquare(48,"white")}
            {this.renderSquare(49,"black")}
            {this.renderSquare(50,"white")}
            {this.renderSquare(51,"black")}
            {this.renderSquare(52,"white")}
            {this.renderSquare(53,"black")}
            {this.renderSquare(54,"white")}
            {this.renderSquare(55,"black")}
        </div>
        <div className="board-row">
            {this.renderSquare(56,"black")}
            {this.renderSquare(57,"white")}
            {this.renderSquare(58,"black")}
            {this.renderSquare(59,"white")}
            {this.renderSquare(60,"black")}
            {this.renderSquare(61,"white")}
            {this.renderSquare(62,"black")}
            {this.renderSquare(63,"white")}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares:new Array("bR","bN","bB","bQ","bK","bB","bN","bR",
                                  "bp","bp","bp","bp","bp","bp","bp","bp",
                                  null, null, null, null, null, null, null, null,
                                  null, null, null, null, null, null, null, null,
                                  null, null, null, null, null, null, null, null,
                                  null, null, null, null, null, null, null, null,
                                  "wp","wp","wp","wp","wp","wp","wp","wp",
                                  "wR","wN","wB","wQ","wK","wB","wN","wR"),
            }],
            turn: "white",
            chosen: null,
        }
    }
    whitePromotion(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'p' 
                       && this.state.turn === 'white' 
                       && coords[i].charAt(1) === '8'
                       && (chess.moves().includes(coords[i]+'='+'Q')
                       ||chess.moves().includes(coords[i]+'=Q#')
                       ||chess.moves().includes(coords[i]+'=Q+'))
                       && coords[this.state.chosen].charAt(0)===coords[i].charAt(0) ;
    }
    blackPromotion(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'p' 
               && this.state.turn === 'black' && coords[i].charAt(1) === '1'
               && (chess.moves().includes(coords[i]+'='+'Q')
               || chess.moves().includes(coords[i]+'=Q#')
               ||chess.moves().includes(coords[i]+'=Q+') );
    }
    castlingShortWhite(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'K' 
               && coords[i]==='g1' 
               && this.state.turn === 'white'
               && (chess.moves().includes('O-O') 
               || chess.moves().includes('O-O#') 
               || chess.moves().includes('O-O+'));
    }
    castlingLongWhite(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'K' 
               && coords[i]==='c1' 
               && this.state.turn === 'white'
               && (chess.moves().includes('O-O-O') 
               || chess.moves().includes('O-O-O#') 
               || chess.moves().includes('O-O-O+') );
    }
    castlingShortBlack(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'K' 
               && coords[i]==='g8' 
               && this.state.turn === 'black'
               && (chess.moves().includes('O-O') 
               || chess.moves().includes('O-O#') 
               || chess.moves().includes('O-O+'));
    }
    castlingLongBlack(i,squares) {
        return squares[this.state.chosen].charAt(1) === 'K' 
               && coords[i]==='c8' 
               && this.state.turn === 'black'
               && (chess.moves().includes('O-O-O')
               || chess.moves().includes('O-O-O#') 
               || chess.moves().includes('O-O-O+'));
    }
    takesPiece(i,squares,moved,tosquare) {
        return (chess.moves({square: coords[this.state.chosen]}).includes(moved+'x'+tosquare) 
                || chess.moves({square: coords[this.state.chosen]}).includes(moved+'x'+tosquare+'#')
                || chess.moves({square: coords[this.state.chosen]}).includes(moved+'x'+tosquare+'+') )
                && squares[i].charAt(0) !== this.state.turn.charAt(0);
    }
    emptySquare(i,squares,moved,tosquare) {
        return chess.moves({square: coords[this.state.chosen]}).includes(moved+tosquare) 
               || chess.moves({square: coords[this.state.chosen]}).includes(moved+tosquare+'#') 
               || chess.moves({square: coords[this.state.chosen]}).includes(moved+tosquare+'+');
    }
    enpassant(i) {
        let moves = chess.moves({square:coords[this.state.chosen], verbose:true});
        var enpassantAvailable = false;
        var enpassantAttempted = false;
        var enpassantIndex = -1;
        for(var j=0; j < moves.length; j++) {
            if(moves[j].flags.includes('e')) {
                enpassantAvailable = true;
                enpassantIndex = j;
            }
        }

        if(enpassantAvailable && coords[i] === moves[enpassantIndex].to) {
            enpassantAttempted = true;
        }

        return enpassantAttempted && enpassantAvailable;
    }
    getEnpassantFile(i) {
        let moves = chess.moves({square:coords[this.state.chosen], verbose:true});
        var file = '';
        for(var j=0; j < moves.length; j++) {
            if(moves[j].flags.includes('e')) {
                file = moves[j].to.charAt(0);
            }
        }        
        return file;
    }
    changeTurn() {
        if(this.state.turn === "white") {
            this.setState({turn: "black"});
        } else if (this.state.turn === "black") {
            this.setState({turn: "white"});
        }
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();


        console.log(chess.moves());
        /*
        Set flags for choosing a square. First click chooses a square,
        second chooses where to move
        */
        if(this.state.chosen === null && squares[i] !== null) {
            if(this.state.turn.charAt(0) === squares[i].charAt(0)) {
                this.setState({chosen: i});
            }
        } else {
            this.setState({chosen: null});
        }
        if(squares[i] !== null && this.state.chosen === i) {
        /*Superfluous*/
            squares[i] = squares[i];
        /*
        If the square is empty and a square has been chosen.. 
        */
        } else if (squares[i] === null && this.state.chosen !== null) {
            console.log(this.state.chosen);
            /* Chosen piece in algebraic notation */
            const moved = squares[this.state.chosen].charAt(1) !== 'p' ? squares[this.state.chosen].charAt(1) : '';
            //If two pieces can move to the same square, there may be possible ambiguity,
            //either in the file or the rank. These cases must be checked separately.
            const movedAmbiguousFile = moved + coords[this.state.chosen].charAt(0);
            const movedAmbiguousRank = moved + coords[this.state.chosen].charAt(1);
            const movedVerbose = moved + coords[this.state.chosen];
            /* Chosen square to move the piece to */
            const tosquare = coords[i];
            console.log(moved+tosquare);
            /* Promotion */
            if(this.whitePromotion(i,squares) ) {
                squares[i] = 'wQ';
                squares[this.state.chosen] = null;
                this.changeTurn();
                chess.move(coords[i]+'='+'Q');
            }
            else if(this.blackPromotion(i,squares) ) {
                squares[i] = 'bQ';
                squares[this.state.chosen] = null;
                this.changeTurn();
                chess.move(coords[i]+'='+'Q');
            }
            /* Castling for white */
            else if(this.castlingShortWhite(i,squares) ) {
                squares[i] = squares[this.state.chosen];
                squares[63] = null;
                squares[61] = 'wR';
                this.changeTurn();
                chess.move('O-O');
            }
            else if(this.castlingLongWhite(i,squares)) {
                squares[i] = squares[this.state.chosen];
                squares[56] = null;
                squares[59] = 'wR';
                this.changeTurn();
                chess.move('O-O-O');
            }
            /* 
            Castling for black
            */
            else if(this.castlingShortBlack(i,squares) ) {
                squares[i] = squares[this.state.chosen];
                squares[7] = null;
                squares[5] = 'bR';
                this.changeTurn();
                chess.move('O-O');
            }
            else if(this.castlingLongBlack(i,squares) ) {
                squares[i] = squares[this.state.chosen];
                squares[0] = null;
                squares[3] = 'bR';
                this.changeTurn();
                chess.move('O-O-O');
            }
            //Handling en passant
            else if(this.enpassant(i)&&this.state.turn==="white" ) {
                let rank = parseInt(coords[i].charAt(1));
                let rankOfTakenPawn = rank - 1;
                let fileOfTakenPawn = this.getEnpassantFile(i);

                let rankOfTakenPawnChar = rankOfTakenPawn + '';
                console.log(fileOfTakenPawn+rankOfTakenPawnChar);
                squares[coords.indexOf(fileOfTakenPawn+rankOfTakenPawnChar) ] = null;
                squares[i] = squares[this.state.chosen];
                squares[this.state.chosen] = null;
                this.changeTurn();
                chess.move(movedVerbose+'x'+tosquare, {sloppy: true});
            }
            /*
            If not castling or en passant */
            else if(this.emptySquare(i,squares,moved,tosquare)
                   ||this.emptySquare(i,squares,movedAmbiguousFile,tosquare)
                   ||this.emptySquare(i,squares,movedVerbose,tosquare)
                   ||this.emptySquare(i,squares,movedAmbiguousRank,tosquare) ) {
                squares[i] = squares[this.state.chosen];
                squares[this.state.chosen] = null;
                this.changeTurn();
                chess.move(movedVerbose+tosquare, {sloppy: true});
            }
        /*
        If the square is filled with an enemy piece and square has been chosen.. 
        */
        } else if(squares[i] !== null && this.state.chosen !== null) {
        
            let moved = squares[this.state.chosen].charAt(1) !== 'p' ? squares[this.state.chosen].charAt(1)
                         : coords[this.state.chosen].charAt(0);
            const movedAmbiguousFile = moved + coords[this.state.chosen].charAt(0);
            const movedAmbiguousRank = moved + coords[this.state.chosen].charAt(1);
            const movedVerbose = moved + coords[this.state.chosen];
            let tosquare = coords[i];
            console.log(moved+'x'+tosquare)
            if(this.takesPiece(i,squares,moved,tosquare)
               ||this.takesPiece(i,squares,movedAmbiguousFile,tosquare)
               ||this.takesPiece(i,squares,movedAmbiguousRank,tosquare)
               ||this.takesPiece(i,squares,movedVerbose,tosquare)) {

                squares[i] = squares[this.state.chosen];
                squares[this.state.chosen] = null;
                this.changeTurn();
                chess.move(movedVerbose+'x'+tosquare,{sloppy: true});

                
            }     
        }
        this.setState({history: history.concat([{
            squares: squares,
        }])});
        if (chess.game_over()) {
            this.setState({squares: Array(64).fill(null)})
            this.setState({turn: "Game Over"})
        }
    }
    render() {
        const history = this.state.history;
        const current = history[history.length-1];
        var status = "Next player: " + this.state.turn;
        return (
        <div className="game">
            <div className="game-board">
                <Board 
                 squares={current.squares}
                 onClick={(i)=> this.handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
