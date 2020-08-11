export class Place {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public imageUrl: string, 
        public price: number,
        public availableTo: Date,
        public availableFrom: Date,
        public userId: string) {
    }
}