using demo from '../db/demo';

service EmployeeService {
    entity Employees as projection on demo.Employee;
}
