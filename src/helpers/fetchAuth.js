import axios from "axios";

const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:3001/verify-token", {}, { headers: { Authorization: token } })
    if (response) {
        return { verify: response.data.verify, message: response.data.message }
    } return false
}

export { fetchAuth }