export class ClockTime {
    timeMS: number;
    speed: number;
    readonly intervalMS: number = 200;

    constructor() {
        this.timeMS = 55 * 1000;
        this.speed = 1;
    }

    toString(): string {
        return (this.timeMS / 1000).toFixed(1);
    }

    left(): boolean {
        return this.timeMS > 0;
    }

    tick(writeTo: HTMLElement) {
        setTimeout(() => {
            if (this.timeMS > 0) {
                this.timeMS -= this.intervalMS * this.speed;
                writeTo.innerHTML = this.toString();
                this.tick(writeTo);
            } else {
                this.timeMS = 0;
                writeTo.innerHTML = this.toString();
            }
        }, this.intervalMS);
    }
} 