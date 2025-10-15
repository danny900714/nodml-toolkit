import { loadEmpoyeeData } from "../employee";

// 郵件登陸 > 新增單筆
export function onInsertMailDocModalOpen(element: HTMLDivElement) {
    const employees = loadEmpoyeeData();

    // Auto select department based on the name in comment field
    const commentInput = element.querySelector('#Comment')! as HTMLInputElement;
    commentInput.addEventListener('input', (e) => {
        const event = e as InputEvent;
        const input = event.target as HTMLInputElement;

        let chineseInput = '';
        for (let i = 0; i < input.value.length; i++) {
            // Filter out ASCII characters
            if (input.value.codePointAt(i)! > 127) {
                chineseInput += input.value.charAt(i);
            }

            // Check whether the chinese input matches the employess map
            if (chineseInput.length >= 3 && employees.has(chineseInput)) {
                const employee = employees.get(chineseInput)!;

                // Select all the department fields based on the employee's department.
                // Since there are multiple department selection lists that are hard to differentiate from each other,
                // we then click all the matched list item.
                const modalItems = document.querySelectorAll('#CaseHandlingDepartmentIdRecipient_listbox[aria-live="polite"] > li');
                for (const modalItem of modalItems) {
                    if (modalItem.textContent === `(社)${employee.department}`) {
                        (modalItem as HTMLLIElement).click();
                    }
                }
            }
        }
    });
}
