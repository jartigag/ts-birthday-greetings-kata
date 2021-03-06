import fs from "fs";
import path from "path";
import { EmployeesRepository } from "@domain/EmployeesRepository";
import { Employee } from "@domain/Employee";
import { OurDate } from "@domain/OurDate";

export const CSVEmployeesRepository: EmployeesRepository = {
  getEmployeesByBirthDate(fileName: string, birthDate: OurDate): Employee[] {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../resources/${fileName}`),
      "UTF-8"
    );

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();

    // create employee
    const employees = lines
      .map((line) => line.split(", "))
      .map(
        (employeeData) =>
          new Employee(
            employeeData[1],
            employeeData[0],
            employeeData[2],
            employeeData[3]
          )
      )
      .filter((employee) => employee.isBirthday(birthDate));
    return employees;
  },
};
