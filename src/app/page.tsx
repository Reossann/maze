'use client';

import { useCallback, useRef, useState } from 'react';
import styles from './page.module.css';

const Directions = {
  UP: 2,
  RIGHT: 3,
  DOWN: 4,
  LEFT: 5,
};

const GOAL = 8;
const WALL = 1;
const EMPTY = 0;
export default function Home() {
  const [isRunning, setisRunning] = useState(false);

  const restoreID = useRef(false);

  const delay = 500;

  const [board, setBoard] = useState([
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const direction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const findMover = () => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const cell = board[y][x];
        if (cell >= Directions.RIGHT && cell <= Directions.UP) {
          return { y, x };
        }
      }
    }
    return null; // 駒が見つからない
  };

  //柱作る関数
  const create = () => {
    const newbaord = [
      [2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 8],
    ];

    const anotherbaord = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let Counter = 0;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (anotherbaord[y][x] === 1) {
          let Notrapped = 0;
          do {
            if (Counter >= 4) {
              const ram = Math.floor(Math.random() * (4 - 1) + 1);

              const dy_dx = direction[ram];
              console.log(dy_dx);
              if (newbaord[y + dy_dx[0]][x + dy_dx[1]] === 1) {
                continue;
              }
              newbaord[y + dy_dx[0]][x + dy_dx[1]] = 1;

              Notrapped += 1;
            } else {
              const ram = Math.floor(Math.random() * 4);
              const dy_dx = direction[ram];
              console.log(10);
              console.log(dy_dx);
              if (newbaord[y + dy_dx[0]][x + dy_dx[1]] === 1) {
                console.log(999);
                continue;
              }
              newbaord[y + dy_dx[0]][x + dy_dx[1]] = 1;
              Notrapped += 1;
              Counter += 1;
            }
          } while (Notrapped === 0);
        }
      }
    }
    console.log(newbaord);
    setBoard(newbaord);
  };

  const Go = useCallback(() => {
    const moverPos = findMover();
    if (!moverPos) {
      setisRunning(false);
      return;
    }
    const { y, x } = moverPos;
    const newBoard = structuredClone(board);

    let shouldContinue = true;

    const nextAction = () => Go();

    const newboard = structuredClone(board);
    const Rsx = x + 1;
    const Lsx = x - 1;
    const Usy = y - 1;
    const Dsy = y + 1;

    if (newboard[y][x] === GOAL) {
      alert('ごおおーる');
      newboard[y][x] = 10;
      shouldContinue = false;
    } //右向き
    else if (newboard[y][x] === 2) {
      if (newboard[y][Rsx] !== undefined && newboard[y][Rsx] === 8) {
        newboard[y][x] = 0;
      } else if (newboard[Usy] === undefined || newboard[Usy][x] === 1) {
        if (newboard[y][Rsx] !== undefined && newboard[y][Rsx] === 0) {
          newboard[y][x] = 0;
          newboard[y][Rsx] = 2;
          console.log('右');
        } else {
          newboard[y][x] = 3;
        }
      } else {
        newboard[y][x] = 0;
        newboard[Usy][x] = 5;
      }
    } //下向き
    if (newboard[y][x] === 3) {
      if (newboard[Dsy] !== undefined && newboard[Dsy][x] === 8) {
        newboard[y][x] = 0;
      }
      if (newboard[y][Rsx] === undefined || newboard[y][Rsx] === 1) {
        if (newboard[Dsy] !== undefined && newboard[Dsy][x] === 0) {
          newboard[y][x] = 0;
          newboard[Dsy][x] = 3;
          console.log('下');
        } else {
          newboard[y][x] = 4;
        }
      } else {
        newboard[y][x] = 0;
        newboard[y][Rsx] = 2;
      }
    } //左向き
    if (newboard[y][x] === 4) {
      if (newboard[y][Lsx] !== undefined && newboard[y][Lsx] === 8) {
        newboard[y][x] = 0;
      }
      if (newboard[Dsy] === undefined || newboard[Dsy][x] === 1) {
        if (newboard[y][Lsx] !== undefined && newboard[y][Lsx] === 0) {
          newboard[y][x] = 0;
          newboard[y][Lsx] = 4;
          console.log('左');
        } else {
          newboard[y][x] = 5;
        }
      } else {
        newboard[y][x] = 0;
        newboard[Dsy][x] = 3;
      }
    } //上向き
    if (newboard[y][x] === 5) {
      if (newboard[Usy] !== undefined && newboard[Usy][x] === 8) {
        newboard[y][x] = 0;
      }
      if (newboard[y][Lsx] === undefined || newboard[y][Lsx] === 1) {
        if (newboard[Usy] !== undefined && newboard[Usy][x] === 0) {
          newboard[y][x] = 0;
          newboard[Usy][x] = 5;
          console.log('上');
        } else {
          newboard[y][x] = 2;
        }
      } else {
        newboard[y][x] = 0;
        newboard[y][Lsx] = 4;
      }
    }
    console.log(1000);
    console.log(newboard);
  }, [board, delay]);

  const GoON = () => {
    if (isRunning) return;
    setisRunning(true);
    // 最初のtickを予約してループを開始
    restoreID.current = setTimeout(Go, delay);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flame} onClick={create}>
        ルーレット
      </div>
      <div className={styles.flame} onClick={() => Go()}>
        GO!!!!
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{
                background:
                  color === 1
                    ? '#808080'
                    : color === 8
                      ? '#ff0909'
                      : color === 10
                        ? '#0000ff'
                        : '#fff',
              }}
            >
              {color !== 1 && (
                <div
                  className={styles.traiangle}
                  style={{
                    background: color >= 2 ? '#f00' : '#fff',
                    clipPath:
                      color === 2 || color === 10
                        ? 'polygon(0 0, 0 100%, 100% 50%)'
                        : color === 3
                          ? 'polygon(0 0, 100% 0%, 50% 100%)'
                          : color === 4
                            ? 'polygon(100% 0, 0 50%, 100% 100%)'
                            : 'polygon(0 100%, 50% 0, 100% 100%)',
                  }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
