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

export const MOCK_TASKS = [
  { id: 1, title: "Complete project documentation", completed: false, userId: 1 },
  { id: 2, title: "Review pull requests", completed: true, userId: 1 },
  { id: 3, title: "Update dependencies", completed: false, userId: 2 },
  { id: 4, title: "Write unit tests", completed: false, userId: 1 },
  { id: 5, title: "Fix bug in authentication", completed: true, userId: 2 },
  { id: 6, title: "Implement new feature", completed: false, userId: 3 },
  { id: 7, title: "Optimize database queries", completed: false, userId: 1 },
  { id: 8, title: "Add error handling", completed: true, userId: 2 },
];
