// 單位收文作業 > 收文作業 > 收文登錄
export function onDepartmentRecieveDocRegistrationOpen(body: HTMLDivElement) {
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
