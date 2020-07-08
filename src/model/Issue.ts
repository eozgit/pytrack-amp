export interface IssueWithPosition {
    id: number;
    status: number;
    index: number;
}

export interface IssueWithProperties {
    title: string;
    description: string;
    type: number;
    storypoints: number;
    priority: number;
}

export default interface Issue extends IssueWithPosition, IssueWithProperties { }
