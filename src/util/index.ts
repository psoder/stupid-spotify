export function formatTime(ms: number, useLeadingZeros = false): string {
    const date = new Date(ms);
    const minutes = date.getUTCMinutes().toString();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    if (useLeadingZeros) {
        return [minutes.padStart(2, "0"), seconds].join(":");
    } else {
        return [minutes, seconds].join(":");
    }
}
