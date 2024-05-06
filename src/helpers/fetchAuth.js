import axios from "axios";
const URL = process.env.REACT_APP_BASE_URL;
const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${URL}/verify-token`, {}, { headers: { Authorization: token } })
    if (response) {
        return { verify: response.data.verify, message: response.data.message }
    } return { verify: false, message: "Sunucu bağlantı hatası" }
}

export { fetchAuth }