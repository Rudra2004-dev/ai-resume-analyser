import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export const convertPdfToImage = async (
    file: File
) => {

    const fileReader = new FileReader();

    return new Promise<{
        file: File | null;
    }>((resolve) => {

        fileReader.onload = async () => {

            const typedArray = new Uint8Array(
                fileReader.result as ArrayBuffer
            );

            const pdf = await pdfjsLib.getDocument({data: typedArray}).promise;

            const page = await pdf.getPage(1);

            const viewport = page.getViewport({ scale: 2 });

            const canvas = document.createElement("canvas");

            const context = canvas.getContext("2d");

            if (!context) {
                resolve({ file: null });
                return;
            }

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport,
                
            }).promise;

            canvas.toBlob((blob) => {

                if (!blob) {
                    resolve({ file: null });
                    return;
                }

                const imageFile = new File(
                    [blob],
                    "resume-preview.png",
                    {
                        type: "image/png",
                    }
                );

                resolve({
                    file: imageFile,
                });

            });

        };

        fileReader.readAsArrayBuffer(file);
    });
};