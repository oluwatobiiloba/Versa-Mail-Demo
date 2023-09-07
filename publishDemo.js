require("dotenv").config();
const { PubSub } = require("@google-cloud/pubsub");
const topicObj = JSON.parse(process.env.TOPIC_INFO);
const projectId = process.env.PROJECT_ID;
const pubsub = new PubSub({ projectId });

const publishMessage = async (topicName, message) => {
  const topicNameOrId = topicObj[topicName].name;

  const topic = pubsub.topic(topicNameOrId);
  const retrieveTopic = await topic.get();
  const retrievedTopic = retrieveTopic[0];

  const json = message;
  const customAttributes = {
    origin: "versa_demo",
    type: message.type,
  };
  const sendMessage = await retrievedTopic.publishMessage({
    json,
    attributes: customAttributes,
  });
  console.log(sendMessage);
};

const singleMessage = {
  type: "single",
  withDefaultTemplate: true,
  templateName: "welcome",
  constants: {
    username: "John Doe",
    subject: "Test Email",
    body: "Hello, this is a test email!",
    sender: "oluwatobiloba",
    platform: "Test Mailer",
  },
  email: "oluwatobiloba.f.a@gmail.com",
  replyTo: "reply@example.com",
  subject: "Test Email Subject",
  message: "This is the text content of the email.",
  attachments: [
    {
      name: "attachment.txt",
      url: "https://stackliteblob.blob.core.windows.net/image/Nodemailer22_profile_image.png",
    },
  ],
};
const bulkMessage = {
  type: "bulk",
  withDefaultTemplate: true,
  templateName: "welcome",
  subject: "Welcome to our Community!",
  users: [
    {
      email: "ooluwatobiiloba@gmail.com",
      username: "User One",
      body: "Hello User One, welcome to our community!",
      attachments: [
        {
          name: "image1",
          url: "https://stackliteblob.blob.core.windows.net/image/Nodemailer22_profile_image.png",
        },
      ],
    },
    {
      email: "oluwatobiloba.f.a@gmail.com",
      username: "User Two",
      body: "Hello User Two, welcome to our community!",
      attachments: [
        {
          name: "image2",
          url: "https://stackliteblob.blob.core.windows.net/image/Nodemailer22_profile_image.png",
        },
      ],
    },
  ],
  constants: {
    platform: "Test Mailer",
    sender: "Test Sender",
  },
};
publishMessage("bulk", bulkMessage);
