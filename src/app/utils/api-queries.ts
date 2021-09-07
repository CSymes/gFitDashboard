export interface AggregateDataBody {
  startTimeMillis: number;
  endTimeMillis: number;
  aggregateBy: AggregateBy[];
  bucketByTime: {
    period: {
      type: string;
      value: number;
      timeZoneId: string;
    }
  }
}

interface AggregateBy {
  dataTypeName: string;
}
