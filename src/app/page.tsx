'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    console.log(newbaord);
    console.log(888);

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
                console.log(999);
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

  const ovserveL = () => {
    const newbaro = structuredClone(board);
    console.log(newbaro[0][0]);
    newbaro[0][0] += 1;
    if (newbaro[0][0] === 6) {
      newbaro[0][0] = 2;
    }
    console.log(newbaro);
    setBoard(newbaro);
  };

  const Go = (y: number, x: number, board: number[][]) => {
    const newboard = structuredClone(board);
    const Rsx = x + 1;
    const Lsx = x - 1;
    const Usy = y - 1;
    const Dsy = y + 1;
    setInterval(() => {
      if (newboard[y][x] === 2 && newboard[y][Rsx] === 0) {
        newboard[y][x] = 0;
        newboard[y][Rsx] = 2;
        console.log(100);
        return Go(y, Rsx, newboard);
      }
    }, 200);
    setBoard(newboard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flame} onClick={create}>
        ルーレット
      </div>
      <div className={styles.flame} onClick={ovserveL}>
        方向変換
      </div>
      <div className={styles.flame} onClick={() => Go(0, 0, board)}>
        GO!!!!
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{ background: color === 1 ? '#808080' : '#fff' }}
            >
              {color !== 1 && (
                <div
                  className={styles.traiangle}
                  style={{
                    background: color >= 2 ? '#f00' : '#fff',
                    clipPath:
                      color === 2
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
