export type Job = {
    id: string;
    order: number | null;
    title: string;
    dates: string;
    duties: string[];
    company: string;
}