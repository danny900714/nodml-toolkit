// @ts-ignore isolatedModules

import { loadEmpoyeeData } from "./employee";

// Initialize mapping from keyup event code to real number
const codeNumberMap = new Map<string, string>();
for (let i = 1; i <= 10; i++) {
    codeNumberMap.set(`Digit${i}`, `${i}`);
}

// handle form modal change (display and dismiss)
function handleBodyChange(records: MutationRecord[], _observer: MutationObserver) {
    for (const record of records) {
        for (const node of record.addedNodes) {
            if (node instanceof HTMLDivElement) {
                switch (node.id) {
                    case 'InsertMailDoc':
                        onInsertMailDocModalOpen(node);
                        break;
                }
            }
        }
    }
}

// 郵件登陸 > 新增單筆
function onInsertMailDocModalOpen(element: HTMLDivElement) {
    const employees = loadEmpoyeeData();

    // Record and input the correct number from barcode scanner regardless of the language of input method.
    const numberInput = element.querySelector('#DocMailNumber')! as HTMLInputElement;
    let pendingNumber = '';
    numberInput.addEventListener('keydown', (e) => {
        const event = e as KeyboardEvent;
        if (codeNumberMap.has(event.code)) {
            pendingNumber += codeNumberMap.get(event.code)!;
        } else if (event.code === 'Enter') {
            const target = event.target as HTMLInputElement;
            target.value = pendingNumber;
            pendingNumber = '';
        }
    });

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
                
                // Select the department based on the employee's department
                // const departmentSelect = element.querySelector('#CaseHandlingDepartmentIdRecipient')! as HTMLSelectElement;
                // const departmentField = element.querySelector('#InsertMailDoc span[aria-owns="CaseHandlingDepartmentIdRecipient_listbox"]') as HTMLSpanElement;
                // departmentField.click();
                const modalItemList = document.querySelectorAll('#CaseHandlingDepartmentIdRecipient_listbox')[2];
                const modalItems = modalItemList.querySelectorAll('li');
                for (const modalItem of modalItems) {
                    if (modalItem.textContent === `(社)${employee.department}`) {
                        (modalItem as HTMLLIElement).click();
                        break;
                    }
                }
            }
        }
    });
}

const body = document.getElementsByTagName('body')[0];
const config = { childList: true };
const observer = new MutationObserver(handleBodyChange);
observer.observe(body, config);