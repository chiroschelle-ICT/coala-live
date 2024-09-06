import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  // -- Downlaod Leden lijst
  downloadMailList(data: any[], fileName: string): void {
    // Create a worksheet from your data array
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Generate Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file using FileSaver
    this.saveAsExcelFile(excelBuffer, fileName);  
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }

  // Send mail to Parents
  

}
