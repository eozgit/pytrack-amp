export default interface Issue {
    id: number;
    title: string;
    description: string;
    type: number;
    assignee: string;
    storypoints: number;
    status: number;
    priority: number;
    index: number;
}
