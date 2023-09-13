import Segment from "./Segment";

export default class Ride {
    segments: Segment[];
    OVERNIGHT_FARE: number = 3.90;
    OVERNIGHT_SUNDAY_FARE: number = 5;
    SUNDAY_FARE: number = 2.9;
    NORMAL_FARE: number = 2.1;
    MIN_PRICE: number = 10;

    constructor () {
        this.segments = [];
    }

    addSegment (distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculate () {
        let price = 0
        for (const segment of this.segments) {
            if (segment.isOvernight() && !segment.isSunday()) {
                price += segment.distance * this.OVERNIGHT_FARE;
            }
            if (segment.isOvernight() && segment.isSunday()) {
                price += segment.distance * this.OVERNIGHT_SUNDAY_FARE;
            }
            if (!segment.isOvernight() && segment.isSunday()) {
                price += segment.distance * this.SUNDAY_FARE;
            }
            if (!segment.isOvernight() && !segment.isSunday()) {
                price += segment.distance * this.NORMAL_FARE;
            }
        }
        return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
    }
}