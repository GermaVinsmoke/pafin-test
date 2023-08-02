import "module-alias/register";
import app from "./app.js";
import logger from "./logger/index.js";

const port = 8001;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
