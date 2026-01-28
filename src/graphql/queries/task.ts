import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
      userId
    }
  }
`;

export const GET_USER_TASKS = gql`
  query GetUserTasks($userId: Int!) {
    userTasks(userId: $userId) {
      id
      title
      completed
    }
  }
`;
