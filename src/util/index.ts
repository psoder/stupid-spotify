export function formatTime(ms: number): string {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
