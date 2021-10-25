// const fs = require("fs");
// const stringify = require("csv-stringify/lib/sync");

// (async () => {
//   const data = [
//     {
//       id: 1,
//       name: "hoge",
//       age: 17
//     },
//     {
//       id: 2,
//       name: "fuga",
//       age: 21
//     },
//     {
//       id: 3,
//       name: "piyo",
//       age: 13
//     }
//   ];

//   const csvData = stringify(data, { header: true });
//   fs.writeFileSync("./sample.csv", csvData);
// })();

"use strict";

const fs = require('fs');
const stringifySync = require("csv-stringify/lib/sync");

const data = [
  { Music: '六兆年と一夜物語', Artist: '和楽器バンド' },
  { Music: '天樂', Artist: '和楽器バンド' },
  { Music: '流星', Artist: '和楽器バンド' },
];

const csvString = stringifySync(data, {
  header: false,
});

fs.writeFileSync('out.csv', csvString);