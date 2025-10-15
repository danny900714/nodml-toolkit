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

// Handle application main view change
function handleApMainChange(records: MutationRecord[], _observer: MutationObserver) {
    for (const record of records) {
        for (const node of record.addedNodes) {
            if (node instanceof HTMLDivElement && node.id == 'inner-view') {
                const form = node.querySelector('form');
                if (form && form.action.startsWith('https://nodml.tainan.gov.tw/SPEED30/Inbound/Register/RegisterDepartmentalReceiveDoc')) {
                    onDepartmentRecieveDocRegistrationOpen(node);
                }
            }
        }
    }
}

// 郵件登陸 > 新增單筆
function onInsertMailDocModalOpen(element: HTMLDivElement) {
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

// 單位收文作業 > 收文作業 > 收文登錄
function onDepartmentRecieveDocRegistrationOpen(body: HTMLDivElement) {
    const keepInputCheckbox = body.querySelector('#KeepInputValue')! as HTMLInputElement;
    const observer = new MutationObserver((records) => {
        for (let record of records) {
            if (!(record.target as HTMLInputElement).disabled && record.oldValue === '') {
                // Document number is found and the form is ready for input
                keepInputCheckbox.checked = false;
            }
        }
    })
    observer.observe(keepInputCheckbox, { attributeFilter: ['disabled'], attributeOldValue: true });
}

// Monitor body change
const body = document.getElementsByTagName('body')[0];
const bodyObserver = new MutationObserver(handleBodyChange);
bodyObserver.observe(body, { childList: true });

// Monitor ap-main change
const apMain = document.getElementById('ap-main')!
const apMainObserver = new MutationObserver(handleApMainChange);
apMainObserver.observe(apMain, { childList: true });
