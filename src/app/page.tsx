'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
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

  return (
    <div className={styles.container}>
      <div onClick={create}>ルーレット</div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{ background: color === 1 ? '#808080' : '#fff' }}
            />
          )),
        )}
      </div>
    </div>
  );
}
