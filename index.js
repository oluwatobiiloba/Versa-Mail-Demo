const { http } = require("@google-cloud/functions-framework");
const service = require("./services");

const handler = async (req, res) => {
  const acceptedTypes = ["single", "bulk"];
  if (!req.body.message) {
    const body = req.body;
    const type = req.query.type;
    try {
      if (!type) {
        throw new Error("Please provide an email type");
      }
      if (type && !acceptedTypes.includes(type)) {
        throw new Error("invalid type, can be single or bulk.");
      }
      const response = await service[type](body);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    const body = JSON.parse(
      Buffer.from(req.body.message.data, "base64").toString("utf-8")
    );
    const type = body.type;
    try {
      if (!type) {
        throw new Error("Please provide an email type");
      }
      if (type && !acceptedTypes.includes(type)) {
        throw new Error("invalid type, can be single or bulk.");
      }
      const response = await service[type](body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(400).json(JSON.stringify(body));
    }
  }
};

http("versaMailService", async (req, res) => {
  await handler(req, res);
});