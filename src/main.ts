// @ts-ignore isolatedModules

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
}

const body = document.getElementsByTagName('body')[0];
const config = { childList: true };
const observer = new MutationObserver(handleBodyChange);
observer.observe(body, config);