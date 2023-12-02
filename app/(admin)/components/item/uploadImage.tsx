const cloudName = 'dwweabf16';
const uploadPreset = 'ehsamhhs';
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

interface UploadRequestProps {
    file: File;
    fieldName: string;
    progressCallback: (isComputable: boolean, loaded: number, total: number) => void;
    successCallback: (deleteToken: string) => void;
    errorCallback: (error: string) => void;
}

export const makeUploadRequest = async ({
    file,
    fieldName,
    progressCallback,
    successCallback,
    errorCallback,
    }: UploadRequestProps): Promise<void> => {
    try {
        const url = `${baseUrl}/image/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", uploadPreset);
        formData.append('cloud_name', cloudName);

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            successCallback(await response.json());
        } else {
            errorCallback(await response.text());
        }
    } catch (error:any) {
        errorCallback(error.message);
    }
};
