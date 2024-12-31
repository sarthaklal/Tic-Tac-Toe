<!DOCTYPE html>
<html>
<head>
    <title>Aesthetic Tic Tac Toe</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
            text-align: center;
        }

        .status {
            color: #e94560;
            font-size: 24px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(233, 69, 96, 0.5);
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .cell {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.05);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 48px;
            color: white;
            transition: all 0.3s ease;
        }

        .cell:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .cell.x {
            color: #e94560;
        }

        .cell.o {
            color: #4ecca3;
        }

        .restart {
            margin-top: 20px;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            background: #e94560;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .restart:hover {
            background: #d63851;
            transform: translateY(-2px);
        }

        .winning {
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status"></div>
        <div class="board"></div>
        <button class="restart">Restart Game</button>
    </div>

    <script>
        class TicTacToe {
            constructor() {
                this.board = Array(9).fill('');
                this.currentPlayer = 'X';
                this.gameActive = true;
                this.status = document.querySelector('.status');
                this.boardElement = document.querySelector('.board');
                this.restartButton = document.querySelector('.restart');
                this.init();
            }

            init() {
                this.createBoard();
                this.updateStatus();
                this.restartButton.addEventListener('click', () => this.restart());
            }

            createBoard() {
                this.boardElement.innerHTML = '';
                for (let i = 0; i < 9; i++) {
                    const cell = document.createElement('button');
                    cell.classList.add('cell');
                    cell.addEventListener('click', () => this.handleClick(i));
                    this.boardElement.appendChild(cell);
                }
            }

            handleClick(index) {
                if (!this.gameActive || this.board[index]) return;

                this.board[index] = this.currentPlayer;
                const cell = this.boardElement.children[index];
                cell.textContent = this.currentPlayer;
                cell.classList.add(this.currentPlayer.toLowerCase());

                if (this.checkWin()) {
                    this.gameActive = false;
                    this.status.textContent = `Player ${this.currentPlayer} wins!`;
                    this.highlightWinningCells();
                } else if (this.board.every(cell => cell)) {
                    this.gameActive = false;
                    this.status.textContent = "It's a draw!";
                } else {
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                    this.updateStatus();
                }
            }

            checkWin() {
                const winPatterns = [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ];

                return winPatterns.some(pattern => {
                    return pattern.every(index => 
                        this.board[index] === this.currentPlayer
                    );
                });
            }

            highlightWinningCells() {
                const winPatterns = [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ];

                for (let pattern of winPatterns) {
                    if (pattern.every(index => this.board[index] === this.currentPlayer)) {
                        pattern.forEach(index => {
                            this.boardElement.children[index].classList.add('winning');
                        });
                        break;
                    }
                }
            }

            updateStatus() {
                this.status.textContent = `Player ${this.currentPlayer}'s turn`;
            }

            restart() {
                this.board = Array(9).fill('');
                this.currentPlayer = 'X';
                this.gameActive = true;
                this.createBoard();
                this.updateStatus();
            }
        }

        new TicTacToe();
    </script>
