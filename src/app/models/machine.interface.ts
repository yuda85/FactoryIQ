export interface Metrics {
  efficiency: number;
  temperature: number;
  pressure: number;
}

export interface Machine {
  id: number;
  name: string;
  status: string;
  metrics: Metrics;
}

export interface Department {
  id: number;
  name: string;
  machines: Machine[];
}
