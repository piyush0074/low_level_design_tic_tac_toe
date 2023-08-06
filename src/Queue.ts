interface queueInterface<Type> {
    enQueue(dataItem: Type): void;
    deQueue(): Type | undefined;
    isEmpty(): boolean;
    size(): number;
    printQueue(): void;
}

export class QueueClass<Type> implements queueInterface<Type> {
    private QueueData: Array<Type> = [];

    isEmpty(): boolean {
        let result = this.QueueData.length <= 0;
        return result;
    }

    enQueue(dataItem: Type): void {
        this.QueueData.push(dataItem);
    }

    deQueue(): Type | undefined {
        let element = this.QueueData.shift();
        return element;
    }

    size(): number {
        let len = this.QueueData.length;
        return len;
    }
    printQueue(): void {
        for (let i = 0; i < this.QueueData.length; i++) {
            console.log(this.QueueData[i]);
        }
    }
}

