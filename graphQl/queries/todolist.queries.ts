export const GET_TODOS = `
              query GetTasks($page: Int!, $pageSize: Int!) {
                getTasks(
                  pagination: { page: $page, pageSize: $pageSize },
                  sort: { field: DUE_DATE, order: DESC }
                ) {
                  items {
                    taskID
                    title
                    status
                    priority
                    dueDate
                  }
                  totalCount
                }
              }
            `;