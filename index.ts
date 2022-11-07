import Server from './server';
// import os from 'os'; 
// import cluster from "cluster";

const PORT = process.env.PORT || 1337;


// const numCpu = os.cpus().length;
// console.log(`Number of CPUs: ${numCpu}`);

// if (cluster.isMaster) {
//   for (let i = 0; i < numCpu; i++) {
//     cluster.fork();
//   }
// } else {
  // Server.listen(PORT, () => {
  //   console.log(`Server ${process.pid} is running on http://localhost:${PORT}`);
  // });
// }


Server.listen(PORT, () => {
  console.log(`Server ${process.pid} is running on http://localhost:${PORT}`);
});

