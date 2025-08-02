import { ChartStore} from "./ChartStore"

export class RootStore {
    public chartStore: ChartStore

    constructor() {
        this.chartStore = new ChartStore()
    }
}

export const store = new RootStore()