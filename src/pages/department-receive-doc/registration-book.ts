// 單位收文作業 > 收文報表列印 > 收文登記簿
export function onReportDepartmentRegisterBook(body: HTMLDivElement) {
    // 收文類別 -> 紙本
    const paperRadioButton = body.querySelector('#Paper')! as HTMLInputElement;
    paperRadioButton.click();

    // 收文人員 -> 張家齊
    const userListItems = document.querySelectorAll('#CreateUserId_listbox > li');
    for (let userItem of userListItems) {
        if (userItem.textContent === '張家齊') {
            (userItem as HTMLLIElement).click();
            break;
        }
    }

    // 分頁選項 -> 依承辦人分頁
    const userPagingRadioButton = body.querySelector('#CaseHandlingDepartmentUserPaging')! as HTMLInputElement;
    userPagingRadioButton.click();
}