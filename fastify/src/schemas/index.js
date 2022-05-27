const schema = {
  response: {
    200: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: { type: "integer" },
        message: { type: "string" },
        payload: {
          oneOf: [
            {
              type: "object",
            },
            {
              type: "array",
            },
          ],
        },
      },
    },
    400: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: { type: "integer" },
        message: { type: "string" },
        payload: {
          oneOf: [
            {
              type: "object",
            },
            {
              type: "array",
            },
          ],
        },
      },
    },
  },
};

module.exports = {
  schema,
};
