import axios from 'axios';
export default {
    methods: {
        async cloudImgUpload() {
            const upload_preset = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;
            const cloud_name = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
            const uploadData = new FormData();
            uploadData.append("file", this.image);
            if (upload_preset && cloud_name) {
                uploadData.append("upload_preset", upload_preset);
                uploadData.append("cloud_name", cloud_name);
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    uploadData
                );
                return response.data;
            }
            throw new Error("Cloudinary upload preset or cloud name is missing.");
        }
    }
};
