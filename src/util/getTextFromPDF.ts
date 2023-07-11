import * as pdfjs from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

const getTextFromPDF = (file: File) => {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.onload = async () => {
			pdfjs.GlobalWorkerOptions.workerSrc =
				'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.worker.min.js';

			if (reader.result) {
				let output = '';

				const document = await pdfjs.getDocument(reader.result).promise;
				for (let i = 1; i <= document._pdfInfo.numPages; i++) {
					const page = await document.getPage(i);
					const text = await page.getTextContent();

					let lastHeight = 0;
					text.items.forEach((item) => {
						const textItem = item as TextItem;
						if (textItem.str) {
							output += textItem.str;
						}

						if (textItem.transform[5] !== lastHeight) {
							output += '\r\n';
							lastHeight = textItem.transform[5];
						}
					});
				}

				resolve(output);
			}
		};

		reader.readAsArrayBuffer(file);
	});
};

export default getTextFromPDF;
