// @ts-ignore isolatedModules

import { loadEmpoyeeData } from "./employee";
import { onDepartmentRecieveDocRegistrationOpen } from "./pages/department-receive-doc/registration";
import { onReportDepartmentRegisterBook } from "./pages/department-receive-doc/registration-book";
import { onInsertMailDocModalOpen } from "./pages/mail";

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
                if (!form) continue;
                if (form.action.startsWith('https://nodml.tainan.gov.tw/SPEED30/Inbound/Register/RegisterDepartmentalReceiveDoc')) {
                    onDepartmentRecieveDocRegistrationOpen(node);
                } else if (form.action.startsWith('https://nodml.tainan.gov.tw/SPEED30/Inbound/Report/ReportDepartmentRegisterBook')) {
                    onReportDepartmentRegisterBook(node);
                }
            }
        }
    }
}

// Monitor body change
const body = document.getElementsByTagName('body')[0];
const bodyObserver = new MutationObserver(handleBodyChange);
bodyObserver.observe(body, { childList: true });

// Monitor ap-main change
const apMain = document.getElementById('ap-main')!
const apMainObserver = new MutationObserver(handleApMainChange);
apMainObserver.observe(apMain, { childList: true });
