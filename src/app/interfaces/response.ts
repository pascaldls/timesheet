
export interface ProgressRes {
  progress?: number ;
  total?: number ;
}
export interface ProjectRes {
  name?: string ;
  key?: string ;
  self?: string ;
}
export interface StatusRes {
  description?: string ;
  iconUrl?: string ;
  name?: string ;
}
export interface UserRes {
  accountId?: string ;
  active?: boolean ;
  avatarUrls?: string[] ;
  displayName?: string ;
  emailAddress?: string ;
  key?: string ;
  name?: string ;
  self?: string ;
  timeZone?: string ;
}
export interface WorklogRes {
  author?: UserRes ;
  comment?: string ;
  created?: string ;
  id?: string ;
  issueId?: string ;
  self?: string ;
  started?: string ;
  startedDate?: Date ;
  timeSpent?: string ;
  timeSpentSeconds?: number ;
  updateAuthor?: UserRes ;
  updated: string ;
}
export interface WorklogsRes {
  maxResults?: number ;
  startAt?: number ;
  total?: number ;
  worklogs?: WorklogRes[] ;
}
export interface FieldsRes {
  assignee?: UserRes ;
  progress?: ProgressRes ;
  project?: ProjectRes ;
  status?: StatusRes ;
  summary?: string ;
  timeoriginalestimate?: number ;
  timespent?: number ;
  worklog?: WorklogsRes ;
}
export interface IssuesRes {
  expand?: string ;
  fields?: FieldsRes ;
  id?: string ;
  key?: string ;
  self?: string ; // url
}
export interface SearchRes {
  expand?: string ;
  issues?: IssuesRes[] ;
  maxResults?: number ;
  startAt?: number ;
  total?: number ;
}
