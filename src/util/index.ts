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

export function msToHuman(
    ms: number,
    opt: {
        precision?: "hr" | "min" | "sec";
        unitDisplay?: "short" | "long";
    } = {
        precision: "sec",
        unitDisplay: "long"
    }
): string {
    const totalHours = ms / (1000 * 60 * 60);
    const totalMinutes = ms / (1000 * 60);
    const totalSeconds = ms / 1000;

    let time: {
        hours?: number;
        minutes?: number;
        seconds?: number;
    } = {};

    switch (opt.precision) {
        case "hr":
            time = { hours: Math.round(totalHours) };
            break;
        case "min":
            time = {
                hours: Math.floor(totalHours),
                minutes: Math.round(totalMinutes % 60)
            };
            break;
        case "sec":
            time = {
                hours: Math.floor(totalHours),
                minutes: Math.floor(totalMinutes % 60),
                seconds: Math.round(totalSeconds % 60)
            };
            break;
    }

    const units = {
        hour: opt.unitDisplay === "short" ? "hr" : "hour",
        minute: opt.unitDisplay === "short" ? "min" : "minute",
        second: opt.unitDisplay === "short" ? "sec" : "second"
    };

    if (opt.unitDisplay !== "short") {
        if (time.hours && time.hours > 1) {
            units.hour += "s";
        }

        if (time.minutes && time.minutes > 1) {
            units.minute += "s";
        }

        if (time.seconds && time.seconds > 1) {
            units.second += "s";
        }
    }

    let humanTime = "";
    if (time.hours) {
        humanTime += `${time.hours} ${units.hour}`;
    }
    if (time.minutes) {
        humanTime += ` ${time.minutes} ${units.minute}`;
    }
    if (time.seconds) {
        humanTime += ` ${time.seconds} ${units.second}`;
    }

    return humanTime;
}
