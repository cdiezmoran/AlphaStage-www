const tests = {
  types: `
    type Test {
      _id: String
      comments: [JSON]
      completedObjectives: Int
      createdAt: String
      duration: Float
      mark: Int
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
      testerId: String
    }

    input TestInput {
      comments: [JSON]
      completedObjectives: Int
      createdAt: String
      duration: Float
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
      testerId: String
    }
  `,
  mutation: `
    createTest(test: TestInput): Test
    markTest(_id: String, mark: Int): Test
  `
};

export default tests;
