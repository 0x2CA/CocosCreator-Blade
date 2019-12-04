import XLSX from "xlsx"

export default class XLSXHelper {
    public static getWorkBook(name: string) {
        const workbook = XLSX.readFile(name)
        return workbook;
    }

    public static getSheetNames(workbook: XLSX.WorkBook) {
        return workbook.SheetNames;
    }

    public static getWorkSheet(workbook: XLSX.WorkBook, name: string) {
        return workbook.Sheets[name];
    }

    public static sheet2Json(worksheet: XLSX.WorkSheet, opts?: XLSX.Sheet2JSONOpts) {
        return XLSX.utils.sheet_to_json(worksheet, opts)
    }


}