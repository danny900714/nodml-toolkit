import employees from '../data/employees.json';

export type Employee = {
    name: string,
    department: "人民團體科" | "社會工作及家庭福利科" | "社會救助科" | "身心障礙福利科" | "老人福利科" | "家庭暴力暨性侵害防治中心",
    abbreviations?: string[],
}

export function loadEmpoyeeData() {
    const map = new Map<string, Employee>();
    for (let employee of employees) {
        map.set(employee.name, employee as Employee);
    }
    return map;
}