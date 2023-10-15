import * as dotenv from 'dotenv';
import * as fs from 'fs';

interface Service {
  port: number;
  host: string;
}
export interface EnvData {
  ProjectService: Service;
  EmployeeService: Service;
  ChristianityService: Service;
}

export class EnvService {
  static instance: EnvService;

  private vars: EnvData = {
    ProjectService: null,
    EmployeeService: null,
    ChristianityService: null,
  };

  constructor() {
    if (EnvService.instance instanceof EnvService) {
      return EnvService.instance;
    }

    const environment = process.env.NODE_ENV || 'development';
    const data: any = dotenv.parse(fs.readFileSync(`./${environment}.env`));

    // this.vars.ProjectService = {
    //   host: data.PROJECT_SERVICE_HOST,
    //   port: parseInt(data.PROJECT_SERVICE_PORT),
    // };

    // this.vars.EmployeeService = {
    //   host: data.EMPLOYEE_SERVICE_HOST,
    //   port: parseInt(data.EMPLOYEE_SERVICE_PORT),
    // };

    this.vars.ChristianityService = {
      host: data.CHRISTIANITY_SERVICE_HOST,
      port: parseInt(data.CHRISTIANITY_SERVICE_PORT),
    };

    EnvService.instance = this;
  }

  read(): EnvData {
    return this.vars;
  }

  getEnvironmentFile(): string {
    const environment = process.env.NODE_ENV || 'development';

    return `${environment}.env`;
  }
}
