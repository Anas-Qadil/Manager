import Server from './server';

const PORT = process.env.PORT || 1337;

Server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});