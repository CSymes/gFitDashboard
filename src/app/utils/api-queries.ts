export interface AggregateDataRequestBody {
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

export interface AggDataBody {
  bucket: AggDataBucket[]
}

interface AggDataBucket extends PossibleTime {
  dataset: DataBody[]
}

export interface DataBody {
  dataSourceId: string,
  point: DataPoint[]
}

interface DataPoint extends PossibleTime {
  dataTypeName: string,
  value: PossibleValue[]
}

export interface PossibleTime {
  startTimeNanos?: number,
  startTimeMillis?: number
  endTimeNanos?: number,
  endTimeMillis?: number
}
export interface PossibleValue { intVal?: number, fpVal?: number }
