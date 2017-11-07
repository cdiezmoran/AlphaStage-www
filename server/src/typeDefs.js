import Json from 'graphql-type-json';

const typeDefs = [`
  scalar JSON

  type Query {
    game(_id: String): Game
    games: [Game]
    user(_id: String): User
    users: [User]
  }

  type Game {
    _id: String
    buildsId: String
    coverImage: String
    descriptionState: JSON
    developerIds: [String]
    developers: [User]
    genre: String
    languages: [String]
    macBuild: String
    publisher: String
    releaseStatus: String
    screenshots: [String]
    shortDescription: String
    spaceRequired: String
    tags: [String]
    title: String
    thumbnail: String
    trailer: String
    website: String
    windowsBuild: String
  }

  input GameInput {
    buildsId: String
    coverImage: String
    descriptionState: JSON
    developerIds: [String]
    genre: String
    macBuild: String
    releaseStatus: String
    screenshots: [String]
    shortDescription: String
    tags: [String]
    title: String
    thumbnail: String
    trailer: String
    windowsBuild: String
  }

  type User {
    _id: String
    email: String
    gameIds: [String]
    games: [Game]
    password: String
    profilePic: String
    username: String
  }

  type Mutation {
    createGame(game: GameInput): Game
    createUser(email: String, username: String, password: String, gameIds: [String]): User
    setProfilePicture(userId: String, url: String): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;