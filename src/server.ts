import databaseConnect from "./database/database";

import app from "./app";

(async () => {
  const PORT = process.env.PORT || 8080;

  try {
    databaseConnect(process.env.MONGO_URL)
      .then(() => {
        app.listen(PORT, () => console.log(`Server app working on port http://localhost:${PORT}`));
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
