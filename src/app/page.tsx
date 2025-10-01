'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Directions = {
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
  UP: 5,
};

const GOAL = 8;
const WALL = 1;
const EMPTY = 0;

// const CreateMap = (x:number,y:number)=> {
//   const M = [];
//   for (let xs = 0; xs < x; xs++){
//     for (let ys = 0 ;ys < y; xs++){

//     }
//   }
// };

// const CreateMap = (x, y) => {
//   const M = []; // 盤面全体を格納する配列
//   for (let xs = 0; xs < x; xs++) {
//     const row = []; // 1行分のデータを格納する配列
//     // 内側のループのインクリメントを ys++ に修正
//     for (let ys = 0; ys < y; ys++) {
//       // ここに盤面の各マス（セル）に入れるデータを設定します
//       // 例として、すべてのセルに 0 を入れます
//       row.push(0);
//     }
//     M.push(row); // 完成した1行を盤面に追加
//   }
//   return M; // 作成した盤面を返す
// };

const findMover = (currentboard: number[][]) => {
  console.log(currentboard);
  for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 11; x++) {
      const cell = currentboard[y][x];
      console.log(cell);
      if ((2 <= cell && cell <= 5) || cell === 10) {
        return { y, x };
      }
    }
  }
  return null; // 駒が見つからない
};
export default function Home() {
  const [IsRunning, setIsRunning] = useState(false);
  const [Reset, setReset] = useState(false);

  const delay = 200;

  const initialB = [
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [Board, setBoard] = useState(initialB);

  const direction = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  //柱作る関数
  const create = () => {
    setIsRunning(false);
    setReset(true);
    const newboard = [
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    ];

    const anotherboard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let Counter = 0;

    for (let y = 0; y < 11; y++) {
      for (let x = 0; x < 11; x++) {
        if (anotherboard[y][x] === 1) {
          let Notrapped = 0;
          do {
            if (Counter >= 4) {
              const ram = Math.floor(Math.random() * (4 - 1) + 1);

              const dy_dx = direction[ram];
              console.log(dy_dx);
              if (newboard[y + dy_dx[0]][x + dy_dx[1]] === 1) {
                continue;
              }
              newboard[y + dy_dx[0]][x + dy_dx[1]] = 1;

              Notrapped += 1;
            } else {
              const ram = Math.floor(Math.random() * 4);
              const dy_dx = direction[ram];
              console.log(10);
              console.log(dy_dx);
              if (newboard[y + dy_dx[0]][x + dy_dx[1]] === 1) {
                console.log(999);
                continue;
              }
              newboard[y + dy_dx[0]][x + dy_dx[1]] = 1;
              Notrapped += 1;
              Counter += 1;
            }
          } while (Notrapped === 0);
        }
      }
    }
    console.log(newboard);
    setBoard(newboard);
  };

  useEffect(() => {
    if (!IsRunning) {
      return;
    }
    const timerId = setTimeout(() => {
      setBoard((prevBoard) => {
        const moverPos = findMover(prevBoard);
        if (!moverPos) {
          setIsRunning(false);
          return prevBoard;
        }
        const newboard = structuredClone(prevBoard);
        const { y, x } = moverPos;
        const Rsx = x + 1;
        const Lsx = x - 1;
        const Usy = y - 1;
        const Dsy = y + 1;

        if (newboard[y][x] === GOAL + 2) {
          setIsRunning(false);
        } //右向き
        else if (newboard[y][x] === Directions.RIGHT) {
          console.log(1000);
          //newboard[y]?.[Rsx] === GOALという書き方もある
          if (newboard[y][Rsx] !== undefined && newboard[y][Rsx] === GOAL) {
            alert('ごおおーる');
            setIsRunning(false);
            newboard[y][x] = EMPTY;
            newboard[y][Rsx] += 2;
          } else if (newboard[Usy] === undefined || newboard[Usy][x] === WALL) {
            if (newboard[y][Rsx] !== undefined && newboard[y][Rsx] === EMPTY) {
              newboard[y][x] = EMPTY;
              newboard[y][Rsx] = Directions.RIGHT;
              console.log('右');
            } else {
              newboard[y][x] = Directions.DOWN;
            }
          } else {
            newboard[y][x] = EMPTY;
            newboard[Usy][x] = Directions.UP;
          }
        } //下向き
        else if (newboard[y][x] === Directions.DOWN) {
          if (newboard[Dsy] !== undefined && newboard[Dsy][x] === GOAL) {
            alert('ごおおーる');
            setIsRunning(false);
            newboard[y][x] = EMPTY;
            newboard[Dsy][x] += 2;
          } else if (newboard[y][Rsx] === undefined || newboard[y][Rsx] === WALL) {
            if (newboard[Dsy] !== undefined && newboard[Dsy][x] === EMPTY) {
              newboard[y][x] = EMPTY;
              newboard[Dsy][x] = Directions.DOWN;
              console.log('下');
            } else {
              newboard[y][x] = Directions.LEFT;
            }
          } else {
            newboard[y][x] = EMPTY;
            newboard[y][Rsx] = Directions.RIGHT;
          }
        } //左向き
        else if (newboard[y][x] === Directions.LEFT) {
          if (newboard[y][Lsx] !== undefined && newboard[y][Lsx] === GOAL) {
            alert('ごおおーる');
            setIsRunning(false);
            newboard[y][x] = EMPTY;
            newboard[y][Lsx] += 2;
          } else if (newboard[Dsy] === undefined || newboard[Dsy][x] === WALL) {
            if (newboard[y][Lsx] !== undefined && newboard[y][Lsx] === EMPTY) {
              newboard[y][x] = EMPTY;
              newboard[y][Lsx] = Directions.LEFT;
              console.log('左');
            } else {
              newboard[y][x] = Directions.UP;
            }
          } else {
            newboard[y][x] = EMPTY;
            newboard[Dsy][x] = Directions.DOWN;
          }
        } //上向き
        else if (newboard[y][x] === Directions.UP) {
          if (newboard[Usy] !== undefined && newboard[Usy][x] === GOAL) {
            alert('ごおおーる');
            setIsRunning(false);
            newboard[y][x] = EMPTY;
            newboard[Usy][x] += 2;
          } else if (newboard[y][Lsx] === undefined || newboard[y][Lsx] === WALL) {
            if (newboard[Usy] !== undefined && newboard[Usy][x] === EMPTY) {
              newboard[y][x] = EMPTY;
              newboard[Usy][x] = Directions.UP;
              console.log('上');
            } else {
              newboard[y][x] = Directions.RIGHT;
            }
          } else {
            newboard[y][x] = EMPTY;
            newboard[y][Lsx] = Directions.LEFT;
          }
        }
        return newboard;
      });
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [IsRunning, Board, delay]);

  const GoON = () => {
    console.log(1000);
    setIsRunning(true);
  };

  useEffect(() => {
    if (Reset) {
      alert('迷路生成中。。。');
      setReset(false);
    }
  }, [Reset]);

  return (
    <div className={styles.container}>
      <div className={styles.flame} onClick={create}>
        ルーレット
      </div>
      <div className={styles.flame} onClick={GoON}>
        GO!!!!
      </div>
      <div className={styles.board}>
        {Board.map((row, y) =>
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
