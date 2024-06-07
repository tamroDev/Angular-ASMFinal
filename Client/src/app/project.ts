export interface Project {
  id: number;
  name: string;
  date_created: string;
  budget: number;
  leader_id: number;
}
export interface ProjectTeam {
  id: number;
  name: string;
  date_created: string;
  budget: number;
  leader_id: number;
  team: string | number[];
}

// export interface ProjectTeam {
//   project_id: number;
//   user_id: number;
// }

// api-response.interface.ts

export interface ApiResponse {
  name: string;
  date_created: string;
  budget: number;
  leader_id: string;
  team: string;
}

