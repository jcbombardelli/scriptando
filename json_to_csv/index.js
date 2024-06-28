const fs = require("fs");	
const ethers = require('ethers');
const excel4node = require('excel4node')
const path = require("path");

const inputDirectory = './in';
const outputDirectory = "./out";

const fileList = fs.readdirSync(inputDirectory);

fileList.forEach((filename) => {
  const filePath = path.join(inputDirectory, filename);
  const file = JSON.parse(fs.readFileSync(filePath).toString());

  const excelWorkBook = new excel4node.Workbook();
  const ws = excelWorkBook.addWorksheet('');

  //Headers //Linha // Coluna
  ws.cell(1,1).string('symbol');
  ws.cell(1,2).string('from');
  ws.cell(1,3).string("to");
  ws.cell(1,4).string('value');
  ws.cell(1,5).string('contract');
  ws.cell(1,6).string("hash");
  ws.cell(1,7).string("nonce");

  ws.column(2).setWidth(43);
  ws.column(3).setWidth(43);
  ws.column(5).setWidth(43);
  ws.column(6).setWidth(65);

  file.result.forEach((item, index) => {
    const {
      tokenSymbol, value,  from, to, 
      contractAddress, hash, nonce
    } = item;

    const row = index + 2
    ws.cell(row,1).string(tokenSymbol);
    ws.cell(row,2).string(from);
    ws.cell(row,3).string(to);
    ws.cell(row,4).number(Number(ethers.formatEther(value).toString()));
    ws.cell(row,5).string(contractAddress);
    ws.cell(row,6).string(hash);
    ws.cell(row,7).number(Number(nonce));

  })

  

  excelWorkBook.write(path.join(outputDirectory, `${filename.split('.')[0]}.xlsx`))
});


console.log(fileList)