import React, { Component } from "react";
import sudoku from "sudoku-umd";
import Board from "./Board";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const initialBoard = sudoku.generate("easy").split("");
    this.state = {
      initialBoard,
      board: initialBoard,
      pastBoard: initialBoard,
      difficulty: ""
    };
  }

  handleNewGame = () => {
    const level = this.state.difficulty;
    const newSudoku = sudoku.generate(level);
    this.setState({
      initialBoard: [...newSudoku],
      board: [...newSudoku],
      pastBoard: [...newSudoku]
    });
  };

  handleSetDifficulty = e => {
    const level = e.target.value;
    const newSudoku = sudoku.generate(level);
    this.setState({
      difficulty: e.target.value,
      initialBoard: [...newSudoku],
      board: [...newSudoku],
      pastBoard: [...newSudoku]
    });
  };

  handleRestart = () => {
    this.setState({
      board: this.state.initialBoard,
      pastBoard: this.state.initialBoard
    });
  };

  handleSolve = () => {
    const solve = sudoku.solve(this.state.board);
    if (!solve) {
      alert(`There is no solution.\nImprove your sudoku.`);
    } else {
      this.setState({
        pastBoard: this.state.board,
        board: solve.split("")
      });
    }
  };

  handleUndo = () => {
    this.setState({
      board: this.state.pastBoard
    });
  };

  handleCheck = () => {
    const check = sudoku.solve(this.state.board);
    if (!check) {
      alert(`There is no solution.\nImprove your sudoku.`);
      this.setState({});
    } else {
      alert(`You're on the right way!\nKeep going!`);
    }
  };

  updateBoard = (e, id) => {
    const board = [...this.state.board];
    const tileValue = e.target.value;
    const correctTileValue =
      tileValue.length > 1 ? tileValue.splice(0, 1) : tileValue;
    board.splice(id, 1, correctTileValue !== "" ? correctTileValue : ".");
    this.setState({
      board: board,
      pastBoard: board
    });
    e.preventDefault();
  };

  handleGetCandidates = () => {
    let getCandidates = sudoku.get_candidates(this.state.board);
    if (!getCandidates) {
      alert(`There is no solution.\nImprove your sudoku.`);
    } else {
      getCandidates = getCandidates.reduce(
        (prev, curr) => [...prev, ...curr],
        []
      );
      this.setState({
        pastBoard: this.state.board,
        board: getCandidates
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1 className="App_title">Sudoku</h1>

        <div className="btn_container">
          <select
            className="btn_select"
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleSetDifficulty}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="very-hard">very hard</option>
            <option value="insane">insane</option>
            <option value="inhuman">inhuman</option>
          </select>

          <button onClick={this.handleNewGame}>New Game</button>
          <button onClick={this.handleRestart}>Restart</button>
          <button onClick={this.handleCheck}>Check</button>
          <button onClick={this.handleSolve}>Solve</button>
          <button onClick={this.handleGetCandidates}>Candidates</button>
          <button className="undo" onClick={this.handleUndo}>
            Undo Solve/Candidates
          </button>
        </div>
        <Board
          board={this.state.board}
          initialBoard={this.state.initialBoard}
          updateBoard={this.updateBoard}
        />
      </div>
    );
  }
}

export default App;
