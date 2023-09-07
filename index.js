const { http } = require("@google-cloud/functions-framework");
const service = require("./services");

const acceptedTypes = ["single", "bulk"];

const processRequest = async (req, res, body) => {
  const type = body.type;

  if (!type) {
    throw new Error("Please provide an email type");
  }

  if (!acceptedTypes.includes(type)) {
    throw new Error("Invalid type, can be single or bulk.");
  }

  const response = await service[type](body);
  res.status(200).json(response).send();
};

const handler = async (req, res) => {
  if (
    !req.body.message?.data ||
    !req.body.message?.messageId ||
    !req.body.message?.publishTime
  ) {
    const body = req.body;
    await processRequest(req, res, body);
  } else {
    const messageData = JSON.parse(
      Buffer.from(req.body.message.data, "base64").toString("utf-8")
    );
    await processRequest(req, res, messageData);
  }
};

http("versaMailService", async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message }).send();
  }
});
