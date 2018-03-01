export interface assigneeRes {

}
export interface progressRes {

}
export interface projectRes {

}
export interface statusRes {

}
export interface userRes {
	accountId? : string,
  active? : boolean,
  avatarUrls? : string[],
  displayName? : string,
  emailAddress? : string,
  key? : string,
  name? : string,
  self? : string,
  timeZone? : string,
}
export interface worklogRes{
  author? : userRes,
  comment? : string,
  created? : string,
  id? : string,
  issueId? : string,
  self? : string,
  started? : string,
  startedDate? : Date,
  timeSpent? : string,
  timeSpentSeconds? : number,
  updateAuthor? : userRes,
  updated : string ;
}
export interface worklogsRes {
  maxResults?: number,
  startAt?: number,
  total?: number,
	worklogs? : worklogRes[],
}
export interface fieldsRes {
  assignee?: assigneeRes,
  progress?: progressRes,
  project?: projectRes,
  status?: statusRes,
  summary?: string,
  timeoriginalestimate?: number,
  timespent?: number,
  worklog?: worklogsRes,
}
export interface issuesRes {
  expand?: string ;
  fields?: fieldsRes ;
  id?: string ;
  key?: string ;
  self?: string ; // url
}
export interface searchRes {
  expand?: string ;
  issues?: issuesRes[] ;
  maxResults?: number ;
  startAt?: number ;
  total?: number ;
}
